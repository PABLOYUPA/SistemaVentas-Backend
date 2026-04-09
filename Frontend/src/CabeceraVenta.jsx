import React, { useEffect } from 'react';
import { FcFinePrint } from "react-icons/fc";

const CabeceraVenta = ({ datos, setDatos }) => {
  // Obtiene la fecha actual en formato YYYY-MM-DD para validaciones
  const hoy = new Date().toLocaleDateString('en-CA');

  // Lógica para autogenerar el número de comprobante al cargar el componente
  useEffect(() => {
    const numAleatorio = Math.floor(1000 + Math.random() * 9000);
    const anioActual = new Date().getFullYear();
    const nuevoComprobante = `${anioActual}-UTA-${numAleatorio}`;

    setDatos(prev => ({
      ...prev,
      comprobante: nuevoComprobante
    }));
  }, []);

  // Función para validar que no se elijan fechas futuras
  const manejarCambioFecha = (e) => {
    const fechaSeleccionada = e.target.value;
    if (fechaSeleccionada > hoy) {
      alert("No se puede seleccionar una fecha futura.");
      setDatos({ ...datos, fecha: hoy });
    } else {
      setDatos({ ...datos, fecha: fechaSeleccionada });
    }
  };

  // Estilo base Segoe UI
  const fuenteBase = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'black'
  };

  return (
    <div className="card shadow-sm p-4 border-0 mb-4">
      <div className="row align-items-center">
        {/* Etiqueta de la sección */}
        <div className="col-md-2">
          <h5 className="text-muted m-0 small fw-bold" style={fuenteBase}>
            DATOS DE VENTA
          </h5>
        </div>

        {/* Campo Fecha con validación */}
        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <label className="me-2 small text-secondary" style={fuenteBase}>Fecha Venta:</label>
            <input 
              type="date" 
              className="form-control form-control-sm border-0 bg-light"
              max={hoy}
              value={datos.fecha}
              onChange={manejarCambioFecha}
              style={{ ...fuenteBase, maxWidth: '160px' }}
            />
          </div>
        </div>

        {/* Campo Número de Comprobante */}
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <label className="me-2 small text-secondary" style={fuenteBase}>N° Comprobante:</label>
            <div className="d-flex align-items-center bg-light px-2 py-1 rounded">
              {/* Texto del comprobante en ROJO */}
              <span className="fw-bold me-2" style={{ ...fuenteBase, color: '#dc3545' }}>
                {datos.comprobante}
              </span>
              <FcFinePrint style={{ fontSize: '1.6rem' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabeceraVenta;