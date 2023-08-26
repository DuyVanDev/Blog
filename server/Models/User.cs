
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace server.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserID { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;


    }
}
