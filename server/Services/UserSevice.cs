using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IOptions<MongoDBSettings> _dbSetting;

        public UserService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSetting = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);
        }


        public async Task<User> GetUserRefreshToken(string token)
        {
            return await _usersCollection.Find(r => r.UserID == token).FirstOrDefaultAsync();
        }
        
    }
}