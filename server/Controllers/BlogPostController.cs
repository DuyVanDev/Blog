using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostService _blogPostService;
        private readonly Cloudinary _cloudinary;
        public BlogPostController(IBlogPostService blogPostService,  Cloudinary cloudinary)
        {
            _blogPostService = blogPostService;
            _cloudinary = cloudinary;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result =  await _blogPostService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetById(string postId)
        {
            var result = await _blogPostService.GetById(postId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] BlogPost blogPost)
        {
            if (blogPost == null)
            {
                return BadRequest("Data is not null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var stream = new MemoryStream(Convert.FromBase64String(blogPost.Image.Substring(blogPost.Image.IndexOf(",") + 1))))
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("image.jpg", stream),
                    PublicId = Guid.NewGuid().ToString() // Optionally specify a public ID for the image
                };

                var uploadResult = _cloudinary.Upload(uploadParams);

                if (uploadResult.Error != null)
                {
                    return BadRequest(uploadResult.Error.Message);
                }
                var newblogPost = new BlogPost
                {
                    Title = blogPost.Title,
                    Content = blogPost.Content,
                    UserID = blogPost.UserID,
                    CategoryID = blogPost.CategoryID,
                    Image = uploadResult.SecureUri.AbsoluteUri
                };


                await _blogPostService.CreateAsync(newblogPost);
                return Ok(newblogPost);

            }


        }
    }
}