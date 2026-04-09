using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data; // Importante para reconocer tu AppDbContext
using WebApplication1.Models; // Importante para reconocer tu clase Producto

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Inyectamos el DbContext que configuramos en Program.cs
        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            // Esta línea va a la base de datos TIENDA y trae los 20 productos
            return await _context.Productos.ToListAsync();
        }

        // --- MÉTODO ACTUALIZADO PARA COINCIDIR CON PRODUCTO.CS ---

        // PUT: api/Productos/actualizar-stock/5
        [HttpPut("actualizar-stock/{id}")]
        public async Task<IActionResult> ActualizarStock(string id, [FromBody] decimal cantidadVendida)
        {
            // 1. Buscamos el producto. Nota que tu Id es 'string' en el modelo.
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound(new { mensaje = "Producto no encontrado" });
            }

            // 2. Usamos 'Stock' con S mayúscula como dice tu modelo Producto.cs
            if (producto.Stock < cantidadVendida)
            {
                return BadRequest(new { mensaje = "Stock insuficiente para realizar la venta" });
            }

            // 3. Restamos el stock
            producto.Stock -= cantidadVendida;

            // 4. Guardamos los cambios
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error al actualizar la base de datos");
            }

            return Ok(new { mensaje = "Stock actualizado correctamente", nuevoStock = producto.Stock });
        }
    }
}