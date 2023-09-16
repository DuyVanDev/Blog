using server.Models;

namespace server.Services
{
    public interface IBlogPostService
    {
        Task CreateAsync(BlogPost blogPost);

        Task<IEnumerable<Object>> GetAllAsync();
        Task<BlogPost> GetById(string postId);

        Task<IEnumerable<BlogPost>> GetBlogPostsByUser(string userId);
    }
}