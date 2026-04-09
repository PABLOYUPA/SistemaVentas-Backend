using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Producto")]
    public class Producto
    {
        [Key]
        [Column("id")]
        public string Id { get; set; }

        [Column("nombreComercial")]
        public string NombreComercial { get; set; }

        [Column("nombreGenerico")]
        public string NombreGenerico { get; set; }

        [Column("presentacion")]
        public string Presentacion { get; set; }

        [Column("precio")]
        public decimal Precio { get; set; }

        [Column("stock")]
        public decimal Stock { get; set; }
    }
}