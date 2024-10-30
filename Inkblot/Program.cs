using Inkblot.API;
using Inkblot.DataAccess.DataSeeder;

var builder = WebApplication.CreateBuilder(args);

builder.ConfigureServices();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Seed additional development data
    using var scope = app.Services.CreateScope();
    var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
    seeder.SeedDevelopmentData().Wait();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
