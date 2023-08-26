
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class AuthService: IAuthService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IOptions<MongoDBSettings> _dbSettings;

        public AuthService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSettings = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);

        }

        public async Task Register(User user)
        {
            
            await _usersCollection.InsertOneAsync(user);
            return;
        }

        public async Task<User> Login(User user)
        {
            return await _usersCollection.Find(u=> u.Username == user.Username && u.Password == user.Password ).FirstOrDefaultAsync();
            
        }

        public bool UserExists(User user)
        {
            return  _usersCollection.Find(u => u.Username == user.Username).Any();
        }
    }
}
