using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models;
 public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? CategoryID { get; set; }
        public string? CategoryName { get; set; }

        
    }