
using Inkblot.Common.Models;
using MongoDB.Driver;

namespace Inkblot.DataAccess.Repositories
{
    public class JournalEntryRepository : IJournalEntryRepository
    {
        private readonly IMongoCollection<JournalEntry> journalEntries;
        public JournalEntryRepository(IDbConnection db)
        {
            journalEntries = db.JournalEntryCollection;
        }

        public async Task<List<JournalEntry>> GetAllJournalEntriesAsync()
        {
            var results = await journalEntries.FindAsync(_ => true);
            return results.ToList();
        }

        public async Task<JournalEntry> GetJournalEntryAsync(Guid id)
        {
            var results = await journalEntries.FindAsync(j => j.Id == id);
            return results.FirstOrDefault();
        }

        public async Task<List<JournalEntry>> GetJournalEntriesByUserAsync(Guid userId)
        {
            var results = await journalEntries.FindAsync(j => j.UserId == userId);
            return results.ToList();
        }

        public async Task CreateJournalEntryAsync(JournalEntry journalEntry)
        {
            await journalEntries.InsertOneAsync(journalEntry);
        }

        public async Task DeleteJournalEntryAsync(Guid id)
        {
            var filter = Builders<JournalEntry>.Filter.Eq("Id", id);
            await journalEntries.DeleteOneAsync(filter);
        }
        public async Task UpdateJournalEntryAsync(JournalEntry journalEntry)
        {
            var filter = Builders<JournalEntry>.Filter.Eq("Id", journalEntry.Id);
            await journalEntries.ReplaceOneAsync(filter, journalEntry, new ReplaceOptions { IsUpsert = true });
        }
    }
}
