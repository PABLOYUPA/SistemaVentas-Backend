using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        //GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        //PUT: api/Productos/actualizar-stock/5
        [HttpPut("actualizar-stock/{id}")]
        public async Task<IActionResult> ActualizarStock(string id, [FromBody] decimal cantidadVendida)
        {
            //Buscamos el producto
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound(new { mensaje = "Producto no encontrado" });
            }

            if (producto.Stock < cantidadVendida)
            {
                return BadRequest(new { mensaje = "Stock insuficiente para realizar la venta" });
            }

            //Restamos el stock
            producto.Stock -= cantidadVendida;

            //Guardamos cambios
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
