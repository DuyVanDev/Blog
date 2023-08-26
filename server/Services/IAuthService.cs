
using server.Models;

namespace server.Services
{
    public interface IAuthService
    {
        Task Register(User user);
        Task<User> Login (User user);
        bool UserExists(User user);
    }
}
