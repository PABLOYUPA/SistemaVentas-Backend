// VentaServicio.js - Lógica pura de negocio fuera de los componentes
export const VentaServicio = {
  
  // Método para transformar los datos actuales en un registro de historial
  prepararRegistroHistorial: (datosVenta, datosCliente, productosVenta) => {
    // Cálculo del total para el registro
    const subtotal = productosVenta.reduce((acc, p) => acc + (Number(p.subtotal) || 0), 0);
    const totalConIva = subtotal * 1.15;

    // Retornamos el objeto con la estructura completa para evitar pérdida de datos
    return {
      fecha: datosVenta.fecha,
      comprobante: datosVenta.comprobante,
      // Guardamos el objeto cliente completo para no perder campos (teléfono, dirección, correo, etc.)
      clienteCompleto: { ...datosCliente }, 
      clienteNombre: `${datosCliente.nombre} ${datosCliente.apellido}`, // Para la tabla del historial
      clienteCedula: datosCliente.cedula,
      cantidadProductos: productosVenta.length,
      total: totalConIva,
      detalleProductos: [...productosVenta]
    };
  }
};