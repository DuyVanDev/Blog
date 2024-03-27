// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.SignalR;
// using MongoDB.Bson;
// using server.Hubs;
// using System.Threading.Tasks;

// [ApiController]
// [Route("api/[controller]")]
// public class NotificationController : ControllerBase
// {
//     private readonly IHubContext<NotificationHub> _hubContext;

//     public NotificationController(IHubContext<NotificationHub> hubContext)
//     {
//         _hubContext = hubContext;
//     }

//     [HttpPost("send")]
//     public async Task<IActionResult> SendNotification(string userId, string message)
//     {
//         await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", message);
//         return Ok("Notification sent successfully.");
//     }
// }