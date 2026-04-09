import React from 'react';
// Importamos el icono solicitado para mantener la coherencia profesional
import { FcCancel } from "react-icons/fc";

const estilosTabla = {
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#add8e6', 
    color: '#000', 
    fontWeight: 'bold',
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    color: '#333',
  },
  filaImpar: {
    backgroundColor: '#fff',
  },
  filaPar: {
    backgroundColor: '#f9f9f9',
  },
  sinProductos: {
    textAlign: 'center',
    padding: '20px',
    color: '#777',
    fontStyle: 'italic',
    border: '1px solid #ddd',
  }
};

const TablaDetalle = ({ productos = [], eliminarProducto }) => {
  return (
    <div className="card shadow-sm p-4 border-0 mt-4">

      {/* Título de la sección */}
      <div className="border-bottom pb-2 mb-3">
        <h5 className="text-muted m-0 small fw-bold">DETALLE DE LA VENTA (PRODUCTOS AGREGADOS)</h5>
      </div>

      <table style={estilosTabla.tabla}>
        <thead>
          <tr>
            <th style={estilosTabla.th}>Id</th>
            <th style={estilosTabla.th}>Nombre</th>
            <th style={estilosTabla.th}>Presentación</th>
            <th style={estilosTabla.th}>Precio Venta</th>
            <th style={estilosTabla.th}>Cantidad</th>
            <th style={estilosTabla.th}>Subtotal</th>
            {/* Nueva columna para la acción de eliminar */}
            <th style={{ ...estilosTabla.th, textAlign: 'center' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos && productos.length > 0 ? (
            productos.map((producto, index) => (
              <tr key={index} style={index % 2 === 0 ? estilosTabla.filaImpar : estilosTabla.filaPar}>
                <td style={estilosTabla.td}>{producto.id}</td>
                <td style={estilosTabla.td}>{producto.nombre}</td>
                <td style={estilosTabla.td}>{producto.presentacion}</td>
                <td style={estilosTabla.td}>
                  ${Number(producto.precioVenta).toFixed(2)}
                </td>
                <td style={estilosTabla.td}>{producto.cantidad}</td>
                <td style={estilosTabla.td} className="fw-bold text-success">
                  ${Number(producto.subtotal).toFixed(2)}
                </td>
                {/* Celda del botón eliminar centrada */}
                <td style={{ ...estilosTabla.td, textAlign: 'center' }}>
                  <button 
                    className="btn btn-sm btn-outline-danger border-0 p-0"
                    onClick={() => eliminarProducto(index)}
                    title="Eliminar producto"
                    style={{ background: 'transparent' }}
                  >
                    <FcCancel style={{ fontSize: '1.2rem' }} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* Ajustamos colSpan a 7 para cubrir la nueva columna */}
              <td colSpan="7" style={estilosTabla.sinProductos}>
                No hay productos agregados al detalle de la venta.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDetalle;