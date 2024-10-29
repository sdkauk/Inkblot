using MongoDB.Driver;
using Inkblot.Common.Models;

namespace Inkblot.DataAccess
{
    public interface IDbConnection
    {
        IMongoCollection<JournalEntry> JournalEntryCollection { get; }
        string JournalEntryCollectionName { get; }
        MongoClient Client { get; }
    }
}