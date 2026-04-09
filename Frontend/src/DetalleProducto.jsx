import React from 'react';
//Importamos todos los iconos
import { 
  FcDataRecovery, 
  FcBinoculars, 
  FcCurrencyExchange, 
  FcPositiveDynamic 
} from "react-icons/fc";

const DetalleProducto = ({ seleccionado, setSeleccionado, agregarALista, clienteListo }) => {
  
  //Estilo base Segoe UI
  const fuenteBase = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'black'
  };

  //Campos de solo lectura 
  const estiloSoloLectura = {
    ...fuenteBase,
    cursor: 'default',
    userSelect: 'none',
    fontWeight: 'normal'
  };

  const manejarCambioCantidad = (e) => {
    const valorRaw = e.target.value;
    
    if (valorRaw === '') {
      setSeleccionado({ ...seleccionado, cantidad: '' });
      return;
    }

    if (valorRaw.startsWith('0')) {
      return; 
    }

    const valor = parseInt(valorRaw);
    if (!isNaN(valor) && valor > 0) {
      setSeleccionado({ ...seleccionado, cantidad: valor });
    }
  };

  return (
    <div className={`card shadow-sm p-4 border-0 mb-4 ${!clienteListo ? 'opacity-75' : ''}`}>
      <h5 className="text-muted border-bottom pb-2 mb-4 small fw-bold" style={fuenteBase}>
        DATOS DEL DETALLE DE VENTA
      </h5>
      
      {!clienteListo && (
        <div className="alert alert-warning py-1 px-2 small mb-3" style={fuenteBase}>
          ⚠️ Por favor, busque y seleccione un cliente para habilitar el detalle.
        </div>
      )}

      <div className="row g-3">
        {/* FILA SUPERIOR: Datos del producto */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
            Nombre Comercial <FcDataRecovery className="ms-2" style={{ fontSize: '1.2rem' }} />
          </label>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light" 
            readOnly 
            tabIndex="-1"
            value={seleccionado.nombreComercial || ''} 
            style={estiloSoloLectura} 
          />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
            Nombre Genérico <FcDataRecovery className="ms-2" style={{ fontSize: '1.2rem' }} />
          </label>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light" 
            readOnly 
            tabIndex="-1"
            value={seleccionado.nombreGenerico || ''} 
            style={estiloSoloLectura} 
          />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
            Presentación <FcBinoculars className="ms-2" style={{ fontSize: '1.2rem' }} />
          </label>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light" 
            readOnly 
            tabIndex="-1"
            value={seleccionado.presentacion || ''} 
            style={estiloSoloLectura} 
          />
        </div>

        {/* FILA INFERIOR: Precio, Cantidad y Acciones */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
            Precio <FcCurrencyExchange className="ms-2" style={{ fontSize: '1.2rem' }} />
          </label>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light" 
            readOnly 
            tabIndex="-1"
            value={seleccionado.precio > 0 ? `$${seleccionado.precio.toFixed(2)}` : ''} 
            style={estiloSoloLectura}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
            Cantidad <FcPositiveDynamic className="ms-2" style={{ fontSize: '1.2rem' }} />
          </label>
          <input 
            type="number" 
            className="form-control form-control-sm" 
            min="1"
            onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} 
            value={seleccionado.cantidad}
            onChange={manejarCambioCantidad}
            disabled={!clienteListo || !seleccionado.id} 
            style={fuenteBase}
          />
        </div>

        <div className="col-md-3 d-flex flex-column justify-content-end">
          <label className="form-label small fw-bold text-secondary" style={fuenteBase}>Producto</label>
          <button 
            className="btn btn-outline-primary btn-sm w-100 fw-bold d-flex align-items-center justify-content-center" 
            data-bs-toggle="modal" 
            data-bs-target="#modalProductos"
            disabled={!clienteListo} 
            style={fuenteBase}
          >
            Seleccionar Producto <span className="ms-2">📦</span>
          </button>
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button 
            className="btn btn-success btn-sm w-100 fw-bold shadow-sm d-flex align-items-center justify-content-center" 
            onClick={agregarALista}
            disabled={!clienteListo || !seleccionado.id || !seleccionado.cantidad} 
            style={fuenteBase}
          >
            ACEPTAR <span className="ms-2">✅</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
