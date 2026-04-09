import React from 'react';

const HistorialFactura = ({ historial = [], onReimprimir }) => {
    //Segoe UI
    const fuenteBase = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: 'black',
        fontWeight: 'normal' 
    };

    const estiloCabecera = {
        backgroundColor: '#add8e6',
        color: 'black',
        fontWeight: 'bold'
    };

    return (
        <div className="modal fade" id="modalHistorial" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                    
                    <div className="modal-header bg-primary text-white" style={{ borderRadius: '15px 15px 0 0' }}>
                        <h5 className="modal-title fw-bold" style={{ fontFamily: 'Segoe UI' }}>
                            📜 HISTORIAL DE FACTURAS GENERADAS
                        </h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-4">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead style={estiloCabecera}>
                                    <tr style={{ fontFamily: 'Segoe UI' }}>
                                        <th>Fecha</th>
                                        <th>Comprobante</th>
                                        <th>Cliente</th>
                                        <th className="text-center">Productos</th>
                                        <th className="text-end">Total</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historial.length > 0 ? (
                                        historial.map((factura, index) => (
                                            <tr key={index} style={{ backgroundColor: 'transparent' }}>
                                                <td style={fuenteBase}>{factura.fecha}</td>
                                                <td style={fuenteBase}>{factura.comprobante}</td>
                                                <td style={fuenteBase}>{factura.clienteNombre}</td>
                                                <td className="text-center">
                                                    <span className="badge bg-secondary rounded-pill" style={{ fontWeight: 'normal' }}>
                                                        {factura.cantidadProductos}
                                                    </span>
                                                </td>
                                                <td className="text-end" style={fuenteBase}>
                                                    ${factura.total.toFixed(2)}
                                                </td>
                                                <td className="text-center">
                                                    <button 
                                                        className="btn btn-sm btn-primary px-3 shadow-sm"
                                                        style={{ fontFamily: 'Segoe UI' }}
                                                        onClick={() => onReimprimir(factura)}
                                                        data-bs-dismiss="modal" 
                                                    >
                                                        Reimprimir
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-4" style={fuenteBase}>
                                                No hay facturas registradas en el historial.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ fontFamily: 'Segoe UI' }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistorialFactura;
