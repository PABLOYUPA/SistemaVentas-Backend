import React from 'react';

// 1. Recibimos la nueva prop 'soloLectura'
const FacturaModelo = ({ datosVenta, datosCliente, productos, onGuardar, soloLectura }) => {
  
  const fuenteBase = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'black'
  };

  const estiloModal = {
    ...fuenteBase,
    background: 'linear-gradient(180deg, #c7deff 0%, #fefefe 100%)',
    borderRadius: '15px',
    padding: '30px'
  };

  const lineaSeparadora = "-------------------------------------------------------------------------------------------------------";

  const subtotalFactura = productos.reduce((acc, p) => acc + (Number(p.subtotal) || 0), 0);
  const ivaFactura = subtotalFactura * 0.15;
  const totalFactura = subtotalFactura + ivaFactura;

  return (
    <div className="modal fade" id="modalFactura" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
          
          <div className="modal-body" style={estiloModal}>
            <div className="text-center mb-4">
              <h1 className="fw-bold" style={{ fontSize: '2.5rem' }}>SISTEMA DE VENTAS - UTA</h1>
              <p className="small text-muted">{lineaSeparadora}</p>
            </div>

            {/* SECCIÓN: DATOS DE VENTA */}
            <div className="mb-4">
              <h5 className="fw-bold">DATOS DE VENTA</h5>
              <div className="ms-3">
                <p className="m-0"><strong>Fecha de venta:</strong> {datosVenta.fecha}</p>
                <p className="m-0"><strong>N° de comprobante:</strong> {datosVenta.comprobante || 'S/N'}</p>
              </div>
              <p className="text-center mt-2" style={{ color: '#888' }}>{lineaSeparadora}</p>
            </div>

            {/* SECCIÓN: DATOS DEL CLIENTE */}
            <div className="mb-4">
              <h5 className="fw-bold">DATOS DEL CLIENTE</h5>
              <div className="row ms-2">
                <div className="col-6">
                  <p className="m-0"><strong>Cédula:</strong> {datosCliente.cedula}</p>
                  <p className="m-0"><strong>Apellido:</strong> {datosCliente.apellido}</p>
                  <p className="m-0"><strong>Nombre:</strong> {datosCliente.nombre}</p>
                </div>
                <div className="col-6">
                  <p className="m-0"><strong>Teléfono:</strong> {datosCliente.telefono}</p>
                  <p className="m-0"><strong>Dirección:</strong> {datosCliente.direccion}</p>
                  <p className="m-0"><strong>Correo electrónico:</strong> {datosCliente.correo}</p>
                </div>
              </div>
              <p className="text-center mt-2" style={{ color: '#888' }}>{lineaSeparadora}</p>
            </div>

            {/* SECCIÓN: DETALLE DE LA VENTA */}
            <div className="mb-4">
              <h5 className="fw-bold">DETALLE DE LA VENTA</h5>
              <table className="table table-sm table-borderless mt-2">
                <thead className="border-bottom border-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Presentación</th>
                    <th className="text-center">Precio Venta</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.nombre}</td>
                      <td>{prod.presentacion}</td>
                      <td className="text-center">${Number(prod.precioVenta).toFixed(2)}</td>
                      <td className="text-center">{prod.cantidad}</td>
                      <td className="text-end">${Number(prod.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-center mt-2" style={{ color: '#888' }}>{lineaSeparadora}</p>
            </div>

            {/* SECCIÓN: TOTALES */}
            <div className="d-flex justify-content-end">
              <div style={{ minWidth: '220px' }}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>${subtotalFactura.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">IVA (15%):</span>
                  <span>${ivaFactura.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold border-top border-dark pt-1 mt-1">
                  <span style={{ fontSize: '1.2rem' }}>TOTAL:</span>
                  <span style={{ fontSize: '1.2rem' }}>${totalFactura.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <p className="text-center" style={{ color: '#888' }}>{lineaSeparadora}</p>
              <h4 style={{ fontStyle: 'italic' }}>¡Gracias por preferirnos!</h4>
            </div>

            {/* SECCIÓN DE ACCIONES: Lógica condicional aplicada */}
            <div className="text-end mt-4 no-print">
              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
                Cerrar
              </button>
              
              {/* SOLO MOSTRAR EL BOTÓN SI NO ES REIMPRESIÓN */}
              {!soloLectura && (
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={onGuardar}
                  data-bs-dismiss="modal"
                >
                  Finalizar y Guardar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturaModelo;