using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        Task<User> GetUserRefreshToken(string token);

    }
}