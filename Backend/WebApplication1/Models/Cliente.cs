using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("Cliente")]
    public class Cliente
    {
        [Key]
        [Column("id")]
        [Required(ErrorMessage = "El ID del cliente es obligatorio.")]
        [StringLength(4, ErrorMessage = "El ID no puede tener más de 4 caracteres.")]
        public string Id { get; set; }

        [Column("nombre")]
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre es demasiado largo.")]
        public string Nombre { get; set; }

        [Column("apellido")]
        [Required(ErrorMessage = "El apellido es obligatorio.")]
        public string Apellido { get; set; }

        [Column("cedula")]
        [Required(ErrorMessage = "La cédula es obligatoria.")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "La cédula debe tener 10 dígitos numéricos.")]
        public string Cedula { get; set; }

        [Column("telefono")]
        public string? Telefono { get; set; }

        [Column("direccion")]
        public string? Direccion { get; set; }

        [Column("correo")]
        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El formato del correo no es válido.")]
        public string Correo { get; set; }
    }
}
