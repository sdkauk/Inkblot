using Inkblot.BusinessLogic.JournalEntries.Requests;
using Inkblot.Common.Models;

namespace Inkblot.BusinessLogic.JournalEntries
{
    public interface IJournalEntryService
    {
        Task<JournalEntry> CreateJournalEntry(JournalEntryPostRequest request);
        Task DeleteJournalEntryAsync(Guid id);
        Task<IEnumerable<JournalEntry>> GetAllJournalEntriesAsync();
        Task<IEnumerable<JournalEntry>> GetJournalEntriesByUserAsync(Guid userId);
        Task<JournalEntry> GetJournalEntryAsync(Guid id);
        Task<JournalEntry> UpdateJournalEntryAsync(JournalEntryPutRequest request);
    }
}