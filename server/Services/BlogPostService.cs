using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly IMongoCollection<BlogPost> _blogPostCollection;
        private readonly IMongoCollection<User> _userCollection; 
        private readonly IOptions<MongoDBSettings> _dbSetting;

        public BlogPostService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSetting = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _blogPostCollection = mongoDatabase.GetCollection<BlogPost>(dbSetting.Value.PostCollectionName);
            _userCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);
        }

        public async Task CreateAsync(BlogPost blogPost)
        {
            await _blogPostCollection.InsertOneAsync(blogPost);
            return;
        }

        public async Task<IEnumerable<Object>> GetAllAsync()
        {
            var query =  from blog in _blogPostCollection.AsQueryable() join user in _userCollection.AsQueryable() on blog.UserID equals user.UserID
            select new {blog,user};
            return query;
        }

        public async Task<IEnumerable<BlogPost>> GetBlogPostsByUser(string userId)
        {
            return await _blogPostCollection.Find(b => b.UserID == userId).ToListAsync();    
        }

        public async Task<BlogPost> GetById(string postId)
        {
            return await _blogPostCollection.Find(p=>p.PostID == postId).FirstOrDefaultAsync();
        }
    }
}