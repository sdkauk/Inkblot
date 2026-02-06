namespace Inkblot.BusinessLogic.JournalEntries.Requests
{
    public class JournalEntryPutRequest
    {
        public Guid Id { get; set; }
        public string? Content { get; set; }
    }
}
