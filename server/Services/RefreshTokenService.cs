
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IMongoCollection<RefreshToken> _refreshTokenCollection;
        private readonly IOptions<MongoDBSettings> _dbSettings;

        public RefreshTokenService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSettings = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _refreshTokenCollection = mongoDatabase.GetCollection<RefreshToken>(dbSetting.Value.RefreshTokenCollectionName);

        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            await _refreshTokenCollection.InsertOneAsync(refreshToken);
            return;
        }

        

        public async Task<RefreshToken> GetStoredToken(Token token)
        {
            return await _refreshTokenCollection.Find(r => r.Token == token.RefreshToken).FirstOrDefaultAsync();
        }

        public async Task UpdateStoredToken(RefreshToken token)
        {
            var filter = Builders<RefreshToken>.Filter.Eq(p => p.Id, token.Id);
            var update = Builders<RefreshToken>.Update

                .Set(p => p.IsUsed, token.IsUsed)
                .Set(p => p.IsRevoked, token.IsRevoked);
             await _refreshTokenCollection.UpdateOneAsync(filter, update);
             return;
        }

        
    }
}
