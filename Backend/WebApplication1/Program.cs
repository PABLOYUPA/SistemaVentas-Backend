using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // --- CONFIGURACIÓN DE LA BASE DE DATOS ---
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // --- CONFIGURACIÓN DEL SERVICIO DE CORS ---
            // Prepara a la aplicación para aceptar peticiones externas
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("NuevaPolitica", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // --- CONFIGURACIÓN DE LA TUBERÍA (MIDDLEWARE) ---

            app.MapOpenApi();
            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
            });

            app.UseHttpsRedirection();

            // --- ACTIVACIÓN DEL CORS ---
            // Va antes de UseAuthorization y MapControllers
            app.UseCors("NuevaPolitica");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}