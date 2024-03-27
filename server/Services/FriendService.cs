
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
    public class FriendService : IFriendService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IOptions<MongoDBSettings> _dbSettings;

        // private readonly NotificationService _notificationService;
        public FriendService(IOptions<MongoDBSettings> dbSetting)
        {
            _dbSettings = dbSetting;
            var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(dbSetting.Value.UserCollectionName);
            // _notificationService = notificationService;

        }

        public async Task SendFriendRequest(string senderId, string receiverId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserID, receiverId);
            var update = Builders<User>.Update.Push(u => u.FriendRequests, new FriendRequest { SenderId = senderId, Status = "pending" });

            await _usersCollection.UpdateOneAsync(filter, update);
            // var receiver = await _usersCollection.Find(u => u.UserID == receiverId).FirstOrDefaultAsync();
            // if (receiver != null)
            // {
            //     // Gửi thông báo cho người nhận yêu cầu kết bạn
            //     // await _notificationService.SendFriendRequestNotification(receiverId.ToString(), senderId.ToString());
            // }
        }

        public async Task AcceptFriendRequest(string userId, string friendId)
        {
            var userFilter = Builders<User>.Filter.Eq(u => u.UserID, userId);
            var friendFilter = Builders<User>.Filter.Eq(u => u.UserID, friendId);

            var userUpdate = Builders<User>.Update
                .Push(u => u.Friends, friendId)
                .PullFilter(u => u.FriendRequests, fr => fr.SenderId == friendId);

            var friendUpdate = Builders<User>.Update.Push(u => u.Friends, userId);

            var tasks = new List<Task>
        {
            _usersCollection.UpdateOneAsync(userFilter, userUpdate),
            _usersCollection.UpdateOneAsync(friendFilter, friendUpdate)
        };

            await Task.WhenAll(tasks);
        }

        public async Task DeclineFriendRequest(string userId, string friendId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserID, userId);
            var update = Builders<User>.Update.PullFilter(u => u.FriendRequests, fr => fr.SenderId == friendId);

            await _usersCollection.UpdateOneAsync(filter, update);
        }

        public async Task Unfriend(string userId, string friendId)
        {
            var userFilter = Builders<User>.Filter.Eq(u => u.UserID, userId);
            var friendFilter = Builders<User>.Filter.Eq(u => u.UserID, friendId);

            var userUpdate = Builders<User>.Update.Pull(u => u.Friends, friendId);
            var friendUpdate = Builders<User>.Update.Pull(u => u.Friends, userId);

            var tasks = new List<Task>
    {
        _usersCollection.UpdateOneAsync(userFilter, userUpdate),
        _usersCollection.UpdateOneAsync(friendFilter, friendUpdate)
    };

            await Task.WhenAll(tasks);
        }
    }
}
