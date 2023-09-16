using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server;
public class ChatMessage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string SenderUserId { get; set; }
    public string RecipientUserId { get; set; }
    public string MessageText { get; set; }
    public DateTime Timestamp { get; set; }
}