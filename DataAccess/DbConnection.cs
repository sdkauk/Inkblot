using MongoDB.Driver;
using Inkblot.Common.Models;
using Inkblot.DataAccess;
using Microsoft.Extensions.Configuration;

namespace PaperTrade.DataAccess
{
    public class DbConnection : IDbConnection
    {
        private readonly IConfiguration configuration;
        private readonly IMongoDatabase db;
        private string connectionId = "MongoDB";
        public string DbName { get; private set; }
        public string JournalEntryCollectionName { get; private set; } = "journalentries";

        public MongoClient Client { get; private set; }
        public IMongoCollection<JournalEntry> JournalEntryCollection { get; private set; }

        public DbConnection(IConfiguration configuration)
        {
            this.configuration = configuration;
            Client = new MongoClient(configuration.GetConnectionString(connectionId));
            DbName = configuration["DatabaseName"];
            db = Client.GetDatabase(DbName);

            JournalEntryCollection = db.GetCollection<JournalEntry>(JournalEntryCollectionName);
        }

    }
}
