import React from 'react';

const ResumenVenta = ({ productos = [], habilitarFactura }) => {
    
    const fuenteBase = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: 'black'
    };

    //Suaviza el cambio visual cuando se habilita
    const estiloBotonBase = {
        ...fuenteBase,
        border: 'none',
        fontWeight: 'normal',
        padding: '8px 20px',
        borderRadius: '5px',
        width: '180px',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease' 
    };

    //Si no está habilitada, bajamos la opacidad y cambiamos el cursor
    const estiloBotonGenerar = {
        ...estiloBotonBase,
        backgroundColor: '#cccccc',
        opacity: habilitarFactura ? 1 : 0.5,
        cursor: habilitarFactura ? 'pointer' : 'not-allowed'
    };

    const estiloBotonHistorial = {
        ...estiloBotonBase,
        backgroundColor: '#cccccc',
    };

    //Logica de calculo
    const listaValida = Array.isArray(productos) ? productos : [];
    const subtotalGeneral = listaValida.reduce((acc, p) => acc + (Number(p.subtotal) || 0), 0);
    const iva = subtotalGeneral * 0.15;
    const total = subtotalGeneral + iva;

    const formatear = (valor) => {
        const num = Number(valor);
        return (!isNaN(num) && num > 0) ? `$${num.toFixed(2)}` : '';
    };

    return (
        <div className="d-flex justify-content-between align-items-start mt-4 mb-5">
            
            {/* BLOQUE IZQUIERDO: Calculos */}
            <div style={{ minWidth: '250px' }}>
                <table className="table table-sm table-borderless mb-0">
                    <tbody style={fuenteBase}>
                        <tr>
                            <td className="fw-bold text-secondary small" style={{ width: '120px', padding: '8px 0' }}>SUBTOTAL</td>
                            <td className="text-end border-bottom px-3" style={{ padding: '8px 0' }}>
                                {formatear(subtotalGeneral)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-secondary small" style={{ padding: '8px 0' }}>IVA (15%)</td>
                            <td className="text-end border-bottom px-3" style={{ padding: '8px 0' }}>
                                {formatear(iva)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-secondary small" style={{ padding: '8px 0' }}>TOTAL</td>
                            <td className="text-end border-bottom px-3 fw-bold text-success" style={{ fontSize: '1.1rem', padding: '8px 0' }}>
                                {formatear(total)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* BLOQUE DERECHO: Botones */}
            <div className="d-flex flex-column gap-2 pt-1">
                {/* Boton superior con validacion de estado */}
                <button 
                    type="button" 
                    style={estiloBotonGenerar}
                    className="shadow-sm"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalFactura"
                    // Desactiva el boton fisicamente si la validacion es falsa
                    disabled={!habilitarFactura}
                >
                    Generar Factura
                </button>

                {/* Separador visual */}
                <div style={{ height: '28px' }}></div>

                {/* Boton inferior: Historial actualizado con activador de modal */}
                <button 
                    type="button" 
                    style={estiloBotonHistorial}
                    className="shadow-sm"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalHistorial"
                >
                    Historial de Facturas
                </button>
            </div>
            
        </div>
    );
};

export default ResumenVenta;
