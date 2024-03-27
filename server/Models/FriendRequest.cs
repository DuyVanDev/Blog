
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace server.Models;
public class FriendRequest
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string SenderId { get; set; }
    public string Status { get; set; } // "pending", "accepted", "declined"
}