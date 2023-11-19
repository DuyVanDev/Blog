using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using server.DTO;
using AutoMapper;
using MongoDB.Bson;
using System.Net;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostService _blogPostService;
        private readonly IMapper _mapper;
        private readonly Cloudinary _cloudinary;
        public BlogPostController(IBlogPostService blogPostService, Cloudinary cloudinary, IMapper mapper)
        {
            _blogPostService = blogPostService;
            _cloudinary = cloudinary;
            _mapper = mapper;
        }

        public static string ConvertImageUrlToBase64(string imageUrl)
        {
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    byte[] imageBytes = webClient.DownloadData(imageUrl);
                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions (e.g., if the URL is invalid or the image cannot be downloaded)
                Console.WriteLine("Error: " + ex.Message);
                return null;
            }
        }

        public static bool checkUrlImage(string image)
        {
            List<string> ImageExtensions = new List<string> { ".JPG", ".JPEG", ".JPE", ".BMP", ".GIF", ".PNG", ".WEBP" };
            if (ImageExtensions.Contains(Path.GetExtension(image).ToUpperInvariant()))
            {
                return true;
            }
            return false;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int limit)
        {


            var result = await _blogPostService.GetAllAsync();
            if (limit > 0)
            {
                result = result.Take(limit).ToList();
            }
            return Ok(result);
        }

        [HttpGet("pagination")]
        public async Task<IActionResult> GetItems(int page = 1, int pageSize = 10)
        {
           
            // Logic to retrieve paginated data from your data source
            var paginatedData = await _blogPostService.GetPaginatedData(page, pageSize);

            // Return paginated data in the response
            return Ok(paginatedData);
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetById(string postId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _blogPostService.GetById(postId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromForm] BlogPostDto blogPost)
        {
            if (blogPost == null)
            {
                return BadRequest("Data is not null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Đăng hình ảnh lên cloudinary
            using (var stream = new MemoryStream(Convert.FromBase64String(blogPost.Image.Substring(blogPost.Image.IndexOf(",") + 1))))
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("image.jpg", stream),
                    PublicId = blogPost.PostID// Optionally specify a public ID for the image
                };

                var uploadResult = _cloudinary.Upload(uploadParams);

                if (uploadResult.Error != null)
                {
                    return BadRequest(uploadResult.Error.Message);
                }
                var newblogPost = new BlogPostDto
                {
                    PostID = blogPost.PostID,
                    Title = blogPost.Title,
                    Content = blogPost.Content,
                    UserID = blogPost.UserID,
                    CategoryID = blogPost.CategoryID,
                    Image = uploadResult.SecureUri.AbsoluteUri,
                };
                var blogPostMap = _mapper.Map<BlogPost>(newblogPost);


                await _blogPostService.CreateAsync(blogPostMap);
                return Ok(newblogPost);

            }


        }

        [HttpGet("Post")]
        public async Task<IActionResult> GetBlogPostByUser([FromQuery] string userId)
        {
            ObjectId id = new ObjectId(userId);
            var result = await _blogPostService.GetBlogPostsByUser(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(result);
        }

        [HttpGet("/search")]
        public async Task<IActionResult> SearchPosts([FromQuery] string q)
        {
            var result = await _blogPostService.SearchBlogPost(q);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(result);
        }
        [Authorize]
        [HttpPut("{postId}")]
        public async Task<IActionResult> Update(string postId, [FromForm] BlogPostDto newBlogPost)
        {
            var blogPost = await _blogPostService.GetById(postId);

            //Kiểm tra nếu như image vẫn như cũ(dạng link file(png, jpg, ...)) => convert to base64
            if (checkUrlImage(newBlogPost.Image))
            {
                newBlogPost.Image = ConvertImageUrlToBase64(newBlogPost.Image);

            }
            using (var stream = new MemoryStream(Convert.FromBase64String(newBlogPost.Image.Substring(newBlogPost.Image.IndexOf(",") + 1))))
            {
                var uploadParams = new ImageUploadParams
                {

                    File = new FileDescription("edit.jpg", stream),
                    PublicId = blogPost.PostID, // Optionally specify a public ID for the image
                };
                var deletionParams = new DeletionParams(blogPost.PostID);
                _cloudinary.Destroy(deletionParams);
                var uploadResult = _cloudinary.Upload(uploadParams);

                if (uploadResult.Error != null)
                {
                    return BadRequest(uploadResult.Error.Message);
                }
                if (newBlogPost.UserID != blogPost.UserID)
                {
                    return Forbid();
                }
                if (blogPost == null)
                    return NotFound();
                var resultPostNew = new BlogPostDto
                {
                    PostID = blogPost.PostID,
                    CreatedAt = blogPost.CreatedAt,
                    Image = uploadResult.SecureUri.AbsoluteUri,
                    Title = newBlogPost.Title,
                    Content = newBlogPost.Content,
                    CategoryID = newBlogPost.CategoryID,
                    UserID = blogPost.UserID

                };
                 var blogPostMap = _mapper.Map<BlogPost>(resultPostNew);
                 

                await _blogPostService.UpdateBlogPost(postId, blogPost.UserID, blogPostMap);
                return Ok(resultPostNew);

            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var product = await _blogPostService.GetById(id);
            if (product == null)
                return NotFound();
            await _blogPostService.DeleteAysnc(id);
            return Ok("deleted successfully");
        }
    }
}