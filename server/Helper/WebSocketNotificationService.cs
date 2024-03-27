using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
public class WebSocketNotificationService
{
    private readonly WebSocketHandler _webSocketHandler;

    public WebSocketNotificationService(WebSocketHandler webSocketHandler)
    {
        _webSocketHandler = webSocketHandler;
    }

    public async Task NotifyLikesUpdateAsync(string postId)
    {
        var message = new { postId, action = "like" };
        var jsonMessage = JsonConvert.SerializeObject(message);
        var bytes = Encoding.UTF8.GetBytes(jsonMessage);
        var segment = new ArraySegment<byte>(bytes);

        foreach (var socket in _webSocketHandler.GetAllSockets())
        {
            if (socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
