using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly IMongoCollection<BlogPost> _blogPostCollection;
        private readonly IOptions<MongoDBSettings> _dbSetting;

        public BlogPostService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSetting = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _blogPostCollection = mongoDatabase.GetCollection<BlogPost>(dbSetting.Value.PostCollectionName);
        }

        public async Task CreateAsync(BlogPost blogPost)
        {
            await _blogPostCollection.InsertOneAsync(blogPost);
            return;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await _blogPostCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BlogPost> GetById(string postId)
        {
            return await _blogPostCollection.Find(p=>p.PostID == postId).FirstOrDefaultAsync();
        }
    }
}