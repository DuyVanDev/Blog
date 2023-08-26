using server.Models;

namespace server.Services
{
    public interface ICommentService
    {
        Task CreateAsync(Comment comment);
    }
}