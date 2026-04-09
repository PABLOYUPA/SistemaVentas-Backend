export const VentaServicio = {
  
  //Metodo para transformar los datos actuales en un registro de historial
  prepararRegistroHistorial: (datosVenta, datosCliente, productosVenta) => {
    //Calculo del total para el registro
    const subtotal = productosVenta.reduce((acc, p) => acc + (Number(p.subtotal) || 0), 0);
    const totalConIva = subtotal * 1.15;

    //Retornamos el objeto con la estructura completa para evitar perdida de datos
    return {
      fecha: datosVenta.fecha,
      comprobante: datosVenta.comprobante,
      clienteCompleto: { ...datosCliente }, 
      clienteNombre: `${datosCliente.nombre} ${datosCliente.apellido}`, 
      clienteCedula: datosCliente.cedula,
      cantidadProductos: productosVenta.length,
      total: totalConIva,
      detalleProductos: [...productosVenta]
    };
  }
};
