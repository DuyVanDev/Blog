using System.Collections.Immutable;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Any;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using server.Models;

namespace server.Services
{
    public class CommentService : ICommentService
    {

        private readonly IMongoCollection<Comment> _commentCollection;   
        private readonly IMongoCollection<User> _userCollection;   
        private readonly IOptions<MongoDBSettings> _dbSetting;

        public CommentService(IOptions<MongoDBSettings> dbSetting)
        {
           _dbSetting = dbSetting;
           var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
           var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
           _commentCollection = mongoDatabase.GetCollection<Comment>(dbSetting.Value.CommentCollectionName);
           _userCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);
        }

        public async Task CreateAsync(Comment comment)
        {
            await _commentCollection.InsertOneAsync(comment);
            return;
        }

        public async Task<IEnumerable<Object>> GetCommentByPost(string postId)
        {
           var query =  from comment in _commentCollection.AsQueryable() join user in _userCollection.AsQueryable() on comment.UserID equals user.UserID
            where comment.PostID == postId select new {comment,user};
            return query;
        }
    }
}