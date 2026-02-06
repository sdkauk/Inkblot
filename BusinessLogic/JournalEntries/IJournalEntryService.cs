using Inkblot.BusinessLogic.JournalEntries.Requests;
using Inkblot.Common.Models;

namespace Inkblot.BusinessLogic.JournalEntries
{
    public interface IJournalEntryService
    {
        Task<JournalEntry> CreateJournalEntryAsync(JournalEntryPostRequest request, string userId);
        Task DeleteJournalEntryAsync(Guid id, string userId);
        Task<IEnumerable<JournalEntry>> GetJournalEntriesByUserAsync(string userId);
        Task<JournalEntry> GetJournalEntryAsync(Guid id, string userId);
        Task<JournalEntry> UpdateJournalEntryAsync(JournalEntryPutRequest request, string userId);
    }
}