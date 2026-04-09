import { useState } from 'react'
import axios from 'axios'
import './App.css'
// IMPORTACIÓN DE BOOTSTRAP COMO MÓDULO
import * as bootstrap from 'bootstrap'; 
import ListaProducto from './ListaProducto'; 
import CabeceraVenta from './CabeceraVenta';
import DetalleProducto from './DetalleProducto';
import Cliente from './Cliente';
import TablaDetalle from './TablaDetalle'; 
import ResumenVenta from './ResumenVenta';
import FacturaModelo from './FacturaModelo';
import HistorialFactura from './HistorialFactura';
// Importamos la lógica de negocio externa
import { VentaServicio } from './VentaServicio'; 

const generarNuevoComprobante = () => {
  const numeroAleatorio = Math.floor(1000 + Math.random() * 9000); 
  return `2026-UTA-${numeroAleatorio}`;
};

function App() {
  // --- ESTADOS EXISTENTES ---
  const [datosVenta, setDatosVenta] = useState({
    fecha: new Date().toLocaleDateString('en-CA'),
    comprobante: generarNuevoComprobante() 
  });

  const [datosCliente, setDatosCliente] = useState({
    id: '', cedula: '', apellido: '', nombre: '', 
    telefono: '', direccion: '', correo: ''
  });

  const [seleccionado, setSeleccionado] = useState({
    id: '', nombreComercial: '', nombreGenerico: '', 
    presentacion: '', precio: 0, cantidad: '', stock: 0       
  });

  const [productosVenta, setProductosVenta] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(0);
  const [esReimpresion, setEsReimpresion] = useState(false);

  // --- AISLAMIENTO PARA EL MODAL DE FACTURA ---
  const [productosParaFactura, setProductosParaFactura] = useState([]);


  // --- FUNCIONES ---

  const buscarCliente = async (cedula) => {
    if (!cedula) {
      alert("Por favor ingrese una cédula para buscar");
      setDatosCliente({ id: '', cedula: '', apellido: '', nombre: '', telefono: '', direccion: '', correo: '' });
      return;
    }
    try {
      const url = `https://localhost:7130/api/Cliente/cedula/${cedula}`;
      const respuesta = await axios.get(url);
      if (respuesta.data) { setDatosCliente(respuesta.data); }
    } catch (error) {
      console.error("Error:", error);
      alert("Cédula de cliente no registrada.");
      setDatosCliente({ id: '', cedula: cedula, apellido: '', nombre: '', telefono: '', direccion: '', correo: '' });
    }
  };

  const alSeleccionarProducto = (prod) => {
    setEsReimpresion(false);
    setSeleccionado({
      id: prod.id,               
      nombreComercial: prod.nombreComercial,
      nombreGenerico: prod.nombreGenerico,
      presentacion: prod.presentacion,
      precio: prod.precioVenta || prod.precio || 0,  
      stock: prod.cantidad || prod.stock || 0,      
      cantidad: ''               
    });
  };

  const agregarALista = () => {
    const { id, nombreComercial, precio, cantidad, stock, presentacion } = seleccionado;
    if (!id) { alert("Por favor, seleccione un producto primero."); return; }
    if (!cantidad || cantidad <= 0) { alert("Ingrese una cantidad válida."); return; }
    if (cantidad > stock) { alert(`Error: Cantidad supera el stock.`); return; }

    const nuevoItem = {
      id: id,
      nombre: nombreComercial,   
      presentacion: presentacion,
      precioVenta: precio,        
      cantidad: cantidad,
      subtotal: precio * cantidad 
    };

    setProductosVenta([...productosVenta, nuevoItem]);
    // Sincronizamos con el estado de factura para que el modal se llene mientras agregas
    setProductosParaFactura([...productosVenta, nuevoItem]); 

    setSeleccionado({ id: '', nombreComercial: '', nombreGenerico: '', presentacion: '', precio: 0, cantidad: '', stock: 0 });
  };

  const eliminarDeLista = (indexAEliminar) => {
    const nuevaLista = productosVenta.filter((_, index) => index !== indexAEliminar);
    setProductosVenta(nuevaLista);
    setProductosParaFactura(nuevaLista); // Sincronizamos eliminación
  };

  // --- FUNCIÓN GUARDADO CON AISLAMIENTO ---
  const ejecutarGuardado = async () => {
    try {
      const nuevaEntrada = VentaServicio.prepararRegistroHistorial(
        datosVenta, 
        datosCliente, 
        productosVenta
      );
      setHistorial([...historial, nuevaEntrada]);
      
      const promesasActualizacion = productosVenta.map(prod => {
        return axios.put(
          `https://localhost:7130/api/Productos/actualizar-stock/${prod.id}`, 
          prod.cantidad, 
          { headers: { 'Content-Type': 'application/json' } }
        );
      });

      await Promise.all(promesasActualizacion);
      setRecargarProductos(prev => prev + 1);

      // Antes de limpiar productosVenta, los pasamos definitivamente al estado del modal
      setProductosParaFactura([...productosVenta]); 
      
      setEsReimpresion(false);
      setDatosVenta({ fecha: new Date().toLocaleDateString('en-CA'), comprobante: generarNuevoComprobante() });
      setDatosCliente({ id: '', cedula: '', apellido: '', nombre: '', telefono: '', direccion: '', correo: '' });
      setSeleccionado({ id: '', nombreComercial: '', nombreGenerico: '', presentacion: '', precio: 0, cantidad: '', stock: 0 });
      
      // LIMPIAMOS LA MESA DE TRABAJO (La tabla de atrás)
      setProductosVenta([]); 

      alert("Venta finalizada con éxito.");
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      alert("Error crítico al actualizar el stock.");
    }
  };

  // --- FUNCIÓN REIMPRIMIR CON AISLAMIENTO ---
  const reimprimirFactura = (facturaGuardada) => {
    setEsReimpresion(true); 
    
    setDatosCliente(facturaGuardada.clienteCompleto || {
        cedula: facturaGuardada.clienteCedula || '',
        nombre: facturaGuardada.clienteNombre || '',
        apellido: '', telefono: '', direccion: '', correo: '' 
    });

    setDatosVenta({ fecha: facturaGuardada.fecha, comprobante: facturaGuardada.comprobante });

    // CARGAMOS SOLO EN EL ESTADO DEL MODAL (Aislamiento)
    if (facturaGuardada.detalleProductos) {
        setProductosParaFactura(facturaGuardada.detalleProductos);
    }

    setTimeout(() => {
        const modalElement = document.getElementById('modalFactura');
        if (modalElement) {
            const modalInstancia = bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstancia.show();
        }
    }, 300); 
  };

  const facturaHabilitada = 
    !!datosCliente.cedula && !!datosCliente.nombre && 
    !!datosVenta.comprobante && 
    productosVenta.length > 0;

  return (
    <div className="container-fluid p-0 bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary shadow mb-4">
        <div className="container text-center">
          <span className="navbar-brand fw-bold m-0">🛒 SISTEMA DE VENTAS - UTA</span>
        </div>
      </nav>

      <div className="container">
        <CabeceraVenta datos={datosVenta} setDatos={setDatosVenta} />
        <Cliente datos={datosCliente} setDatos={setDatosCliente} buscarCliente={buscarCliente} />
        <DetalleProducto seleccionado={seleccionado} setSeleccionado={setSeleccionado} agregarALista={agregarALista} clienteListo={!!datosCliente.cedula && !!datosCliente.nombre} />
        <TablaDetalle productos={productosVenta} eliminarProducto={eliminarDeLista} />
        <ResumenVenta productos={productosVenta} habilitarFactura={facturaHabilitada} />
        <ListaProducto alSeleccionar={alSeleccionarProducto} triggerRecarga={recargarProductos} />

        <FacturaModelo 
          datosVenta={datosVenta} 
          datosCliente={datosCliente} 
          productos={productosParaFactura} // <--- USA EL ESTADO AISLADO
          onGuardar={ejecutarGuardado} 
          soloLectura={esReimpresion} 
        />

        <HistorialFactura historial={historial} onReimprimir={reimprimirFactura} />
      </div>
    </div>
  );
}

export default App;