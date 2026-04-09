using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaDetalleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentaDetalleController(AppDbContext context)
        {
            _context = context;
        }

        //GET: api/VentaDetalle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VentaDetalle>>> GetVentaDetalles()
        {
            return await _context.VentaDetalles.ToListAsync();
        }

        //GET: api/VentaDetalle/D001
        [HttpGet("{id}")]
        public async Task<ActionResult<VentaDetalle>> GetVentaDetalle(string id)
        {
            var ventaDetalle = await _context.VentaDetalles.FindAsync(id);

            if (ventaDetalle == null)
            {
                return NotFound();
            }

            return ventaDetalle;
        }

        //POST: api/VentaDetalle - ARREGLO
        [HttpPost]
        public async Task<ActionResult<VentaDetalle>> PostVentaDetalle(VentaDetalle ventaDetalle)
        {
            try
            {
                _context.VentaDetalles.Add(ventaDetalle);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetVentaDetalle), new { id = ventaDetalle.Id }, ventaDetalle);
            }
            catch (DbUpdateException ex)
            {
                //Escudo para datos extensos o errores de truncamiento
                if (ex.InnerException != null && ex.InnerException.Message.Contains("truncated"))
                {
                    return BadRequest("Error: Uno de los campos es demasiado largo para la base de datos (Máximo 4 caracteres para el ID).");
                }

                //Escudo para saber Si la venta o el producto no existen
                if (ex.InnerException != null && ex.InnerException.Message.Contains("FOREIGN KEY"))
                {
                    return BadRequest("Error: La Venta o el Producto especificado no existen.");
                }

                //Escudo para ids duplicados
                if (_context.VentaDetalles.Any(e => e.Id == ventaDetalle.Id))
                {
                    return Conflict("El ID de este detalle ya existe.");
                }

                return StatusCode(500, "Ocurrió un error inesperado en el servidor.");
            }
        }
    }
}
