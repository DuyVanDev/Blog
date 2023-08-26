using server.Models;

namespace server.Services
{
    public interface IBlogPostService
    {
        Task CreateAsync(BlogPost blogPost);

        Task<IEnumerable<BlogPost>> GetAllAsync();
        Task<BlogPost> GetById(string postId);
    }
}