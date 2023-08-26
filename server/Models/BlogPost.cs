
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

       
        public string Content { get; set; } = null!;
         [BsonRepresentation(BsonType.ObjectId)] 
        public string UserID { get; set; } = null!;
         [BsonRepresentation(BsonType.ObjectId)] 
        public string CategoryID { get; set; } = null!;
        public string Image { get; set; } = null!;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        


    }
}
