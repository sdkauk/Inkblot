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

        public async Task<JournalEntry> GetJournalEntryAsync(Guid id, string userId)
        {
            var entry = await journalEntryRepository.GetJournalEntryAsync(id);

            if (entry == null)
                throw new KeyNotFoundException($"Journal entry with id {id} does not exist.");

            if (entry.UserId != userId)
                throw new UnauthorizedAccessException("You do not have access to this journal entry.");

            return entry;
        }

        public async Task<IEnumerable<JournalEntry>> GetJournalEntriesByUserAsync(string userId)
        {
            return await journalEntryRepository.GetJournalEntriesByUserAsync(userId);
        }

        public async Task<JournalEntry> CreateJournalEntryAsync(JournalEntryPostRequest request, string userId)
        {
            var journalEntry = new JournalEntry
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CreatedUtc = DateTime.UtcNow,
                UpdatedUtc = DateTime.UtcNow,
                Content = request.Content
            };

            await journalEntryRepository.CreateJournalEntryAsync(journalEntry);
            return journalEntry;
        }

        public async Task<JournalEntry> UpdateJournalEntryAsync(JournalEntryPutRequest request, string userId)
        {
            var entry = await journalEntryRepository.GetJournalEntryAsync(request.Id);

            if (entry == null)
                throw new KeyNotFoundException($"Journal entry with id {request.Id} does not exist.");

            if (entry.UserId != userId)
                throw new UnauthorizedAccessException("You do not have access to this journal entry.");

            if (request.Content != null)
            {
                entry.Content = request.Content;
            }
            entry.UpdatedUtc = DateTime.UtcNow;

            await journalEntryRepository.UpdateJournalEntryAsync(entry);
            return entry;
        }

        public async Task DeleteJournalEntryAsync(Guid id, string userId)
        {
            var entry = await journalEntryRepository.GetJournalEntryAsync(id);

            if (entry == null)
                throw new KeyNotFoundException($"Journal entry with id {id} does not exist.");

            if (entry.UserId != userId)
                throw new UnauthorizedAccessException("You do not have access to this journal entry.");

            await journalEntryRepository.DeleteJournalEntryAsync(id);
        }
    }
}
