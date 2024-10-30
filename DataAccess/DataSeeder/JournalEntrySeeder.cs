using Inkblot.Common.Models;
using Inkblot.DataAccess.Repositories;

public class JournalEntrySeeder
{
    private readonly IJournalEntryRepository  journalEntryRepository;

    public JournalEntrySeeder(IJournalEntryRepository journalEntryRepository)
    {
        this.journalEntryRepository = journalEntryRepository;
    }

    public async Task SeedAsync()
    {
        var entries = await journalEntryRepository.GetAllJournalEntriesAsync();

        if (entries.Any())
        {
            return;
        }

        var journalEntries = new List<JournalEntry>
        {
            new JournalEntry
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                CreatedUtc = DateTime.UtcNow,
                UpdateUtc = DateTime.UtcNow,
                Content = "This is some dummy content for a journal entry."
            },
            new JournalEntry
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                CreatedUtc = DateTime.UtcNow,
                UpdateUtc = DateTime.UtcNow,
                Content = "This is some dummy content for a journal entry."
            }
        };

        foreach (var journalEntry in journalEntries)
        {
            await journalEntryRepository.CreateJournalEntryAsync(journalEntry);
        }
    }
}