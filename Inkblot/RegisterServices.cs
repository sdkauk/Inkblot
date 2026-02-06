using Inkblot.BusinessLogic.JournalEntries;
using Inkblot.DataAccess;
using Inkblot.DataAccess.DataSeeder;
using Inkblot.DataAccess.Repositories;

namespace Inkblot.API
{
    public static class RegisterServices
    {
        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<IDbConnection, DbConnection>();

            builder.Services.AddScoped<IJournalEntryRepository, JournalEntryRepository>();
            builder.Services.AddTransient<JournalEntrySeeder>();
            builder.Services.AddTransient<DataSeeder>();

            builder.Services.AddScoped<IJournalEntryService, JournalEntryService>();
        }
    }
}
