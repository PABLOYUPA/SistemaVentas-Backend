import { useEffect, useState } from 'react';
import axios from 'axios';

//Recibimos triggerRecarga como prop
const ListaProductos = ({ alSeleccionar, triggerRecarga }) => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const cargarProductos = async () => {
        try {
            const url = "https://localhost:7130/api/Productos";
            const respuesta = await axios.get(url);
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al conectar con la API:", error);
        }
    };

    //Tabla de productos siempre actualizada
    useEffect(() => {
        cargarProductos();
    }, [triggerRecarga]); 

    const productosFiltrados = productos.filter((p) =>
        p.nombreComercial.toLowerCase().includes(busqueda.toLowerCase())
    );

    const estiloBusqueda = {
        inputGroup: {
            backgroundColor: 'white',
            borderRadius: '25px',
            padding: '5px 15px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            marginTop: '10px'
        },
        input: {
            border: 'none',
            outline: 'none',
            flex: 1,
            padding: '8px',
            fontSize: '16px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: 'black'
        },
        iconoX: {
            fontSize: '18px',
            color: '#6082B6',
            cursor: 'pointer',
            marginLeft: '10px'
        },
        iconoLupa: {
            fontSize: '18px',
            color: '#6082B6',
            cursor: 'default',
            marginLeft: '10px',
            pointerEvents: 'none',
            userSelect: 'none'
        }
    };

    const fuenteBase = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: 'black'
    };

    return (
        <div className="modal fade" id="modalProductos" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content border-0 shadow">
                    
                    <div className="p-3 rounded-top" style={{ backgroundColor: '#6082B6' }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="modal-title m-0 text-white fw-bold" style={{ fontFamily: 'Segoe UI' }}>
                                📦 Seleccionar Producto
                            </h5>
                            <button type="button" className="btn btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        
                        <div style={estiloBusqueda.inputGroup}>
                            <input 
                                type="text"
                                style={estiloBusqueda.input}
                                placeholder="Buscar"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <div className="d-flex align-items-center">
                                {busqueda && (
                                    <span style={estiloBusqueda.iconoX} onClick={() => setBusqueda('')}>✕</span>
                                )}
                                <span style={estiloBusqueda.iconoLupa}>🔍</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr style={{ ...fuenteBase, fontWeight: 'bold' }}>
                                        <th>Nombre Comercial</th>
                                        <th>Presentación</th>
                                        <th className="text-center">Stock</th>
                                        <th>Precio</th>
                                        <th className="text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosFiltrados.length > 0 ? (
                                        productosFiltrados.map((p) => (
                                            <tr key={p.id} style={fuenteBase}>
                                                <td>{p.nombreComercial}</td>
                                                <td>{p.presentacion}</td>
                                                <td className="text-center">{p.stock}</td>
                                                <td>${p.precio.toFixed(2)}</td>
                                                <td className="text-center">
                                                    <button 
                                                        className="btn btn-sm btn-success px-3 shadow-sm" 
                                                        style={{ fontFamily: 'Segoe UI' }}
                                                        data-bs-dismiss="modal"
                                                        onClick={() => alSeleccionar(p)} 
                                                    >
                                                        Seleccionar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center p-4 text-muted" style={fuenteBase}>
                                                No se encontraron productos que coincidan con "{busqueda}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="modal-footer bg-light py-1 text-muted small" style={fuenteBase}>
                        FISEI - UTA 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaProductos;
