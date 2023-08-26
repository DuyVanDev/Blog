using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class CommentService : ICommentService
    {

        private readonly IMongoCollection<Comment> _commentCollection;   
        private readonly IOptions<MongoDBSettings> _dbSetting;

        public CommentService(IOptions<MongoDBSettings> dbSetting)
        {
           _dbSetting = dbSetting;
           var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
           var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
           _commentCollection = mongoDatabase.GetCollection<Comment>(dbSetting.Value.CommentCollectionName);
        }

        public async Task CreateAsync(Comment comment)
        {
            await _commentCollection.InsertOneAsync(comment);
            return;
        }
    }
}