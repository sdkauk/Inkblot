
namespace Inkblot.BusinessLogic.JournalEntries.Requests
{
    public class JournalEntryPostRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime UpdateUtc { get; set; }
        public string Content { get; set; }
    }
}
