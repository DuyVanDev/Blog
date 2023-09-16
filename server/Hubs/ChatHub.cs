// using Microsoft.AspNetCore.SignalR;
// using Microsoft.Extensions.Options;
// using MongoDB.Driver;
// using server.Models;

// namespace server.Hubs
// {
//     public class ChatHub : Hub
//     {
//         private readonly Dictionary<string, string> _userConnections = new Dictionary<string, string>();
//         private readonly IMongoCollection<ChatMessage> _chatCollection;
//         private readonly IOptions<MongoDBSettings> _dbSetting;
//         public ChatHub(IOptions<MongoDBSettings> dbSetting)
//         {
//             _dbSetting = dbSetting;
//             var mongoClient = new MongoClient(dbSetting.Value.ConnectionString);
//             var mongoDatabase = mongoClient.GetDatabase(dbSetting.Value.DatabaseName);
//             _chatCollection = mongoDatabase.GetCollection<ChatMessage>(dbSetting.Value.C);
//         }

//         public override Task OnConnectedAsync()
//         {
//             Connected.myConnectedUsers.Add(Context.ConnectionId);
//             return base.OnConnectedAsync();
//         }

//         public override Task OnDisconnectedAsync(Exception? exception)
//         {
//             Connected.myConnectedUsers.Remove(Context.ConnectionId);
//             return base.OnDisconnectedAsync(exception);
//         }

//         public async Task SendMessage(string recipientUserId, string message)
//         {
//             var senderUserId = Context.User.Identity.Name; // Assuming you have user authentication
//             var chatMessage = new ChatMessage
//             {
//                 SenderUserId = senderUserId,
//                 RecipientUserId = recipientUserId,
//                 MessageText = message,
//                 Timestamp = DateTime.UtcNow
//             };

//             // Save the message to MongoDB
//             await _mongoDbService.InsertMessageAsync(chatMessage);

//             // Send the message to the recipient via SignalR
//             if (_userConnections.TryGetValue(recipientUserId, out var recipientConnectionId))
//             {
//                 await Clients.Client(recipientConnectionId).SendAsync("ReceiveMessage", senderUserId, message);
//             }
//         }

//         // public async Task SendMessageToUser(string user, string message)
//         // {
//         //     if (string.IsNullOrEmpty(user))
//         //         await Clients.All.SendAsync("ReceiveMessage",user, message);
//         //     else
//         //         await Clients.Client(user).SendAsync("ReceiveMessage", user, message);
//         // }
//         // private readonly string _botUser;
//         // private readonly IDictionary<string, UserConnection> _connections;



//         // public ChatHub(IDictionary<string, UserConnection> connections)
//         // {
//         //     _botUser = "MyChat Bot";
//         //     _connections = connections;
//         // }
//         // public async Task SendMessage(string message)
//         // {
//         //     if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
//         //     {
//         //         await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
//         //     }
//         // }
//         // public async Task JoinRoom(UserConnection userConnection)
//         // {
//         //     _connections[Context.ConnectionId] = userConnection;
//         //     await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
//         //     await Clients.Groups(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has join {userConnection.Room}");
//         // }

//         //     private static Dictionary<string, string> userConnections = new Dictionary<string, string>();

//         //     public override async Task OnConnectedAsync()
//         //     {
//         //         string userId = Context.UserIdentifier; // Get the user's unique identifier (e.g., username or user ID)
//         //         string connectionId = Context.ConnectionId;

//         //         if (!userConnections.ContainsKey(userId))
//         //         {
//         //             userConnections[userId] = connectionId;
//         //         }
//         //         else
//         //         {
//         //             userConnections[userId] = connectionId;
//         //         }

//         //         await base.OnConnectedAsync();
//         //     }
//         //     public override async Task OnDisconnectedAsync(Exception exception)
//         // {
//         //     // Implement your disconnection logic here.

//         //     // You can access information about the disconnected client, like the connection ID or user identifier.
//         //     string connectionId = Context.ConnectionId;

//         //     // You can also use the exception parameter to handle disconnections due to errors.
//         //     if (exception != null)
//         //     {
//         //         // Handle the disconnection due to an exception.
//         //         Console.WriteLine($"Client {connectionId} disconnected due to an exception: {exception.Message}");
//         //     }
//         //     else
//         //     {
//         //         // Handle the normal disconnection.
//         //         Console.WriteLine($"Client {connectionId} disconnected.");
//         //     }

//         //     await base.OnDisconnectedAsync(exception);
//         // }

//         //     public async Task SendMessageToUser(string userId, string message)
//         //     {
//         //         // if (userConnections.TryGetValue(userId, out string connectionId))
//         //         // {
//         //         //     await Clients.Client(connectionId).SendAsync("ReceiveMessage", userId, message);
//         //         // }
//         //         // else
//         //         // {
//         //         //     // Handle the case when the target user is not connected.
//         //         //     // You can send an error message or take appropriate action.
//         //         // }

//         //         if (string.IsNullOrEmpty(userId))
//         //             await Clients.All.SendAsync("ReceiveMessage",userId, message);
//         //         else
//         //             await Clients.Client(userId).SendAsync("ReceiveMessage", userId, message);
//         //     }

//     }
// }