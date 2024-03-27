using server.Models;

namespace server.Services
{
    public interface IFriendService
    {
        Task DeclineFriendRequest(string userId, string friendId);
        Task AcceptFriendRequest(string userId, string friendId);
        Task SendFriendRequest(string senderId, string receiverId);

        Task Unfriend(string userId, string friendId);

    }
}