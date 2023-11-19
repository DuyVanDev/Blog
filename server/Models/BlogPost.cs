
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class BlogPost
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? PostID { get; set; }
        public string Title { get; set; } = null!;

       
        public string Content { get; set; }
         [BsonRepresentation(BsonType.ObjectId)] 
        public string UserID { get; set; }
        [BsonIgnoreIfNull]
        public string Username { get; set; }
         [BsonRepresentation(BsonType.ObjectId)] 
        public string CategoryID { get; set; } 
        [BsonIgnoreIfNull]
        public string CategoryName { get; set; }
        [BsonIgnoreIfNull]
        public string? Avatar { get; set; }
        public string Image { get; set; }

        public List<Comment>? Comments { get; set; }
        public DateTime? CreatedAt { get; set; } 

        


    }
}
