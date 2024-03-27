// using Microsoft.AspNetCore.SignalR;
// using server.Hubs;
// using System.Threading.Tasks;

// namespace server.Models {
//     public class NotificationService
// {
//     private readonly IHubContext<NotificationHub> _hubContext;

//     public NotificationService(IHubContext<NotificationHub> hubContext)
//     {
//         _hubContext = hubContext;
//     }

//     public async Task SendFriendRequestNotification(string userId, string senderUsername)
//     {
//         await _hubContext.Clients.User(userId).SendAsync("ReceiveFriendRequest", senderUsername);
//     }
// }
// }