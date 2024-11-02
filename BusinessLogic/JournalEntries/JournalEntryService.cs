using Inkblot.BusinessLogic.JournalEntries.Requests;
using Inkblot.Common.Models;
using Inkblot.DataAccess.Repositories;

namespace Inkblot.BusinessLogic.JournalEntries
{
    public class JournalEntryService : IJournalEntryService
    {
        private readonly IJournalEntryRepository journalEntryRepository;

        public JournalEntryService(IJournalEntryRepository journalEntryRepository)
        {
            this.journalEntryRepository = journalEntryRepository;
        }

        public async Task<IEnumerable<JournalEntry>> GetAllJournalEntriesAsync()
        {
            return await journalEntryRepository.GetAllJournalEntriesAsync();
        }

        public async Task<JournalEntry> GetJournalEntryAsync(Guid id)
        {
            return await journalEntryRepository.GetJournalEntryAsync(id);
        }

        public async Task<IEnumerable<JournalEntry>> GetJournalEntriesByUserAsync(Guid userId)
        {
            return await journalEntryRepository.GetJournalEntriesByUserAsync(userId);
        }

        public async Task<JournalEntry> CreateJournalEntry(JournalEntryPostRequest request)
        {
            var journalEntry = new JournalEntry()
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                CreatedUtc = DateTime.UtcNow,
                UpdatedUtc = DateTime.UtcNow,
                Content = request.Content
            };

            await journalEntryRepository.CreateJournalEntryAsync(journalEntry);
            return journalEntry;
        }

        public async Task<JournalEntry> UpdateJournalEntryAsync(JournalEntryPutRequest request)
        {
            var entry = await journalEntryRepository.GetJournalEntryAsync(request.Id);

            if (entry == null)
            {
                throw new Exception($"Journal entry with id {request.Id} does not exist.");
            }

            if (request.Content != null)
            {
                entry.Content = request.Content;
            }
            entry.UpdatedUtc = DateTime.UtcNow;

            await journalEntryRepository.UpdateJournalEntryAsync(entry);
            return entry;
        }

        public async Task DeleteJournalEntryAsync(Guid id)
        {
            await journalEntryRepository.DeleteJournalEntryAsync(id);
        }

    }
}
