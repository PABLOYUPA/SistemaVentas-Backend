using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Venta")]
    public class Venta
    {
        [Key]
        [Column("id")]
        [Required(ErrorMessage = "El ID de la venta es obligatorio.")]
        [StringLength(4, ErrorMessage = "El ID de venta no puede superar los 4 caracteres.")]
        public string Id { get; set; }

        [Column("idCliente")]
        [Required(ErrorMessage = "Debe asignar un cliente a la venta.")]
        [StringLength(4, ErrorMessage = "El ID del cliente no es válido.")]
        public string IdCliente { get; set; }

        [Column("fechaVenta")]
        [Required(ErrorMessage = "La fecha de venta es obligatoria.")]
        public DateTime FechaVenta { get; set; }

        [Column("numeroDocumento")]
        [Required(ErrorMessage = "El número de documento (factura) es obligatorio.")]
        [StringLength(13, ErrorMessage = "El número de documento es demasiado largo.")]
        public string NumeroDocumento { get; set; }

        [Column("subTotal")]
        [Required(ErrorMessage = "El subtotal es obligatorio.")]
        [Range(0.01, 999999.99, ErrorMessage = "El subtotal debe ser mayor a 0.")]
        public decimal SubTotal { get; set; }

        [Column("iva")]
        [Required(ErrorMessage = "El valor del IVA es obligatorio.")]
        [Range(0, 999999.99, ErrorMessage = "El IVA no puede ser negativo.")]
        public decimal Iva { get; set; }

        [Column("total")]
        [Required(ErrorMessage = "El total de la venta es obligatorio.")]
        [Range(0.01, 999999.99, ErrorMessage = "El total debe ser mayor a 0.")]
        public decimal Total { get; set; }

        // --- SE MANTIENE LA RELACIÓN LOGRADA ---
        public virtual ICollection<VentaDetalle> Detalles { get; set; } = new List<VentaDetalle>();
    }
}