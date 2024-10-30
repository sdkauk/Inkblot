namespace Inkblot.DataAccess.DataSeeder
{
    public class DataSeeder
    {

        private readonly JournalEntrySeeder journalEntrySeeder;

        public DataSeeder(JournalEntrySeeder journalEntrySeeder)
        {
            this.journalEntrySeeder = journalEntrySeeder;
        }

        public async Task SeedDevelopmentData()
        {
            await journalEntrySeeder.SeedAsync();
        }

    }
}
