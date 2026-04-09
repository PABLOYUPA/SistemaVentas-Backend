using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("VentaDetalle")]
    public class VentaDetalle
    {
        [Key]
        [Column("id")]
        [Required(ErrorMessage = "El ID del detalle es obligatorio.")]
        [StringLength(4, ErrorMessage = "El ID del detalle no puede superar los 4 caracteres.")]
        public string Id { get; set; }

        [Column("idVenta")]
        [Required(ErrorMessage = "El detalle debe estar asociado a una venta.")]
        public string IdVenta { get; set; }

        [Column("idProducto")]
        [Required(ErrorMessage = "Debe seleccionar un producto.")]
        public string IdProducto { get; set; }

        [Column("precio")]
        [Required(ErrorMessage = "El precio es obligatorio.")]
        [Range(0.01, 999999.99, ErrorMessage = "El precio debe ser mayor a 0.")]
        public decimal Precio { get; set; }

        [Column("cantidad")]
        [Required(ErrorMessage = "La cantidad es obligatoria.")]
        [Range(0.01, 999999.99, ErrorMessage = "La cantidad debe ser mayor a 0.")]
        public decimal Cantidad { get; set; }

        [Column("subTotal")]
        [Required(ErrorMessage = "El subtotal del detalle es obligatorio.")]
        [Range(0.01, 999999.99, ErrorMessage = "El subtotal debe ser mayor a 0.")]
        public decimal SubTotal { get; set; }

        [ForeignKey("IdVenta")]
        public virtual Venta? Venta { get; set; }
    }
}