import React from 'react';
import { FcBusinessman, FcPhoneAndroid, FcHome, FcInvite } from "react-icons/fc";

const Cliente = ({ datos, setDatos, buscarCliente }) => {
  
  const fuenteBase = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'black'
  };

  // Estilo específico para campos de solo lectura (quita el cursor de texto)
  const estiloSoloLectura = {
    ...fuenteBase,
    cursor: 'default',
    userSelect: 'none' // Evita que se pueda seleccionar el texto como si fuera editable
  };

  return (
    <div className="card shadow-sm p-4 border-0 mb-4">
      <h5 className="text-center text-muted border-bottom pb-2 mb-4 small fw-bold" style={fuenteBase}>
        DATOS DEL CLIENTE
      </h5>
      
      <div className="row g-3">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary" style={fuenteBase}>Cédula / RUC</label>
            <div className="input-group input-group-sm">
              <input 
                type="text" 
                className="form-control fw-bold border-primary shadow-none" 
                value={datos.cedula || ''}
                onChange={(e) => setDatos({...datos, cedula: e.target.value})}
                placeholder="Ej: 1801234567"
                style={fuenteBase}
              />
              <button 
                className="btn btn-primary px-3" 
                type="button" 
                onClick={() => buscarCliente(datos.cedula)}
                style={fuenteBase}
              >
                🔍 Buscar
              </button>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-6">
                <label className="form-label small fw-bold text-secondary" style={fuenteBase}>Apellidos</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-light" 
                  readOnly 
                  tabIndex="-1" // Quita el foco por teclado
                  value={datos.apellido || ''} 
                  style={estiloSoloLectura} // Aplicamos el cursor default
                />
            </div>
            <div className="col-6">
                <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
                  Nombres <FcBusinessman className="ms-2" />
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-light" 
                  readOnly 
                  tabIndex="-1"
                  value={datos.nombre || ''} 
                  style={estiloSoloLectura}
                />
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-md-5 border-start ps-4">
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
              Teléfono <FcPhoneAndroid className="ms-2" />
            </label>
            <input 
              type="text" 
              className="form-control form-control-sm bg-light" 
              readOnly 
              tabIndex="-1"
              value={datos.telefono || ''} 
              style={estiloSoloLectura}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
              Dirección <FcHome className="ms-2" />
            </label>
            <input 
              type="text" 
              className="form-control form-control-sm bg-light" 
              readOnly 
              tabIndex="-1"
              value={datos.direccion || ''} 
              style={estiloSoloLectura}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary d-flex align-items-center" style={fuenteBase}>
              Correo Electrónico <FcInvite className="ms-2" />
            </label>
            <input 
              type="email" 
              className="form-control form-control-sm bg-light" 
              readOnly 
              tabIndex="-1"
              value={datos.correo || ''} 
              style={estiloSoloLectura}
            />
          </div>
        </div>

        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default Cliente;