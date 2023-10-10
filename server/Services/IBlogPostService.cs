using MongoDB.Bson;
using server.DTO;
using server.Models;

namespace server.Services
{
    public interface IBlogPostService
    {
        Task CreateAsync(BlogPost blogPost);

        Task<IEnumerable<BlogPost>> GetAllAsync();
        // Task<IEnumerable<Object>> GetAllAsync();
        Task<IEnumerable<BlogPost>> SearchBlogPost(string searchValue);
        Task<BlogPost> GetById(string postId);

        Task<IEnumerable<BlogPost>> GetBlogPostsByUser(ObjectId userId);
        Task UpdateBlogPost(string id,BlogPost blogPost);
        Task DeleteAysnc(string id);
    }
}