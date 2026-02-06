using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Inkblot.Common.Models
{
    public class JournalEntry
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        public string UserId { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime UpdatedUtc { get; set; }
        public string Content { get; set; }
    }
}