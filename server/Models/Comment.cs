using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace server.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? CommentID { get; set; }
        [BsonRepresentation(BsonType.ObjectId)] 
        public string PostID { get; set; } = null!;
        [BsonRepresentation(BsonType.ObjectId)] 
        public string UserID { get; set; }= null!;
        public string CommentText { get; set; } = null!;
        public DateTime? CreatedAt { get; set; } =   DateTime.Now;

        
    }
}
