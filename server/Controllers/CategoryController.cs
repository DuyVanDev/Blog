using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Category category)
        {
            if(category == null) {
                return BadRequest("Data is null");
            }

            await _categoryService.CreateAsync(category);
            return Ok("Create successfully");
        }
    }

}

