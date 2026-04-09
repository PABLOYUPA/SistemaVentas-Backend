using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1
{
    // Clase principal que define el punto de entrada y la configuración global de la aplicación
    public class Program
    {
        public static void Main(string[] args)
        {
            // Inicialización del constructor de la aplicación web para gestionar servicios y configuración
            var builder = WebApplication.CreateBuilder(args);

            // CONFIGURACIÓN DE LA BASE DE DATOS 
            // Se establece el contexto de datos (Entity Framework) utilizando SQL Server y la cadena de conexión definida
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // CONFIGURACIÓN DEL SERVICIO DE CORS
            // Define las reglas de Intercambio de Recursos de Origen Cruzado para permitir la interacción con el Frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("NuevaPolitica", policy =>
                {
                    // Se permite el acceso desde cualquier origen, cabecera y método para facilitar la interoperabilidad asíncrona
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Registro de controladores para la gestión de los Endpoints de la API
            builder.Services.AddControllers();
            // Configuración de herramientas para la generación automática de documentación técnica (OpenAPI y Swagger)
            builder.Services.AddOpenApi();
            builder.Services.AddSwaggerGen();

            // Construcción de la instancia de la aplicación una vez configurados los servicios
            var app = builder.Build();

            // CONFIGURACIÓN DE LA TUBERÍA DE PROCESAMIENTO (MIDDLEWARE)
            // Habilitación de la interfaz gráfica de Swagger para la visualización y prueba de los servicios de la API
            app.MapOpenApi();
            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/openapi/v1.json", "v1");
            });

            // Redirección automática de peticiones HTTP a HTTPS para garantizar la seguridad en la transmisión
            app.UseHttpsRedirection();

            // ACTIVACIÓN DE LA POLÍTICA DE CORS
            // Se aplica la configuración definida previamente para autorizar peticiones desde el dominio del cliente
            app.UseCors("NuevaPolitica");

            // Middleware para la gestión de autorización y seguridad en las peticiones
            app.UseAuthorization();

            // Mapeo dinámico de los controladores de la aplicación
            app.MapControllers();

            // Ejecución de la aplicación y escucha de peticiones entrantes
            app.Run();
        }
    }
}
