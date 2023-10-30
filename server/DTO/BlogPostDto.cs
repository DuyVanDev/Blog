using MongoDB.Bson.Serialization.Attributes;

namespace server.DTO
{
    public class BlogPostDto
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? PostID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserID { get; set; }
        public string CategoryID { get; set; }
        public string Image { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }
}
