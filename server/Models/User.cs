
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

        public string Avatar { get; set; } = "https://res.cloudinary.com/dqpjoki72/image/upload/v1710771648/avatar_xp9qzc.webp";
        public List<string> Friends { get; set; } = new List<string>();
        public List<FriendRequest> FriendRequests { get; set; } = new List<FriendRequest>();


    }
}
