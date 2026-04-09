using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Venta (Listar todas las ventas con sus detalles)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            return await _context.Ventas.Include(v => v.Detalles).ToListAsync();
        }

        // GET: api/Venta/V001 (Buscar una venta específica)
        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(string id)
        {
            var venta = await _context.Ventas.Include(v => v.Detalles)
                                             .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            return venta;
        }

        // POST: api/Venta (EL CORAZÓN DEL SISTEMA - CON ESCUDOS CONTRA ERRORES)
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(Venta venta)
        {
            try
            {
                // EF Core guardará la venta y la lista de detalles en una sola transacción
                _context.Ventas.Add(venta);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta);
            }
            catch (DbUpdateException ex)
            {
                // 1. ESCUDO PARA LLAVES FORÁNEAS (Si el cliente o producto no existen)
                if (ex.InnerException != null && ex.InnerException.Message.Contains("FOREIGN KEY"))
                {
                    return BadRequest("Error: El Cliente o el Producto especificado no existen en la base de datos. Por favor, verifique los IDs.");
                }

                // 2. ESCUDO PARA IDs DUPLICADOS
                if (_context.Ventas.Any(e => e.Id == venta.Id))
                {
                    return Conflict("El ID de esta venta ya existe.");
                }

                // 3. ERROR GENÉRICO (Para no mostrar pantallas rojas en VS)
                return StatusCode(500, "Ocurrió un error inesperado al intentar guardar en la base de datos.");
            }
        }
    }
}