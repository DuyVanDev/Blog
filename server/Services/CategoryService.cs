using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IMongoCollection<Category> _categoryCollection;
        private readonly IOptions<MongoDBSettings> _dbSettings;
        public CategoryService (IOptions<MongoDBSettings> dbSettings)
        {
            _dbSettings = dbSettings;
            var mongoClient = new MongoClient (dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            _categoryCollection = mongoDatabase.GetCollection<Category>(dbSettings.Value.CategoryCollectionName);
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _categoryCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Category> GetById(string id)  {
            return await _categoryCollection.Find(a=> a.CategoryID == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Category category)
        {
           await _categoryCollection.InsertOneAsync(category);
             return;
        }

        public async Task Update(string id,Category category)
        {
            await _categoryCollection.FindOneAndReplaceAsync(a => a.CategoryID == id,category);
            return;
        }

        public async Task DeleteAsync(string id) 
        {
            await _categoryCollection.FindOneAndDeleteAsync(a=> a.CategoryID == id);
            return;
        }

        
    }

    
}