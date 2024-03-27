using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

public class WebSocketHandler
{
    private ConcurrentBag<WebSocket> _sockets = new ConcurrentBag<WebSocket>();

    public void AddSocket(WebSocket socket)
    {
        _sockets.Add(socket);
    }

    public async Task RemoveSocket(WebSocket socket)
    {
        _sockets.TryTake(out socket);
        await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Socket disconnected", System.Threading.CancellationToken.None);
    }

    public IEnumerable<WebSocket> GetAllSockets()
    {
        return _sockets;
    }
     public async Task HandleWebSocketConnection(WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        // Xử lý dữ liệu từ client và gửi trả lời
        // Ví dụ: echo lại dữ liệu
        while (!result.CloseStatus.HasValue)
        {
            await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }

        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }
}
