using Inkblot.Common.Models;

namespace Inkblot.DataAccess.Repositories
{
    public interface IJournalEntryRepository
    {
        Task CreateJournalEntryAsync(JournalEntry journalEntry);
        Task DeleteJournalEntryAsync(Guid id);
        Task<List<JournalEntry>> GetAllJournalEntriesAsync();
        Task<List<JournalEntry>> GetJournalEntriesByUserAsync(Guid userId);
        Task<JournalEntry> GetJournalEntryAsync(Guid id);
        Task UpdateJournalEntryAsync(JournalEntry journalEntry);
    }
}