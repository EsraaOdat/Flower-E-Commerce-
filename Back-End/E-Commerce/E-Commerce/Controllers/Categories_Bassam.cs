using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static E_Commerce.SaveImageBassam.SaveImage;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Categories_Bassam : ControllerBase
    {
        private readonly MyDbContext _db;
        public Categories_Bassam(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet("GetAllCategories")]
        public ActionResult GetAllCategories()
        {

            var categories = _db.Categories.ToList();
            return Ok(categories);

        }
        [HttpGet("getCategoryById/{id}")]
        public IActionResult GetCategory(int id) { 
            var cat = _db.Categories.Find(id);
            return Ok(cat);
        }
        [HttpPost]
        public IActionResult CreateCategory([FromForm] DTOsCategoryBassam dto)
        {
            var b = SaveImage1(dto.Image);


            var category = new Category
            {
                Name = dto.Name,
                Image = dto.Image.FileName,
                Description = dto.Description,
            };

            //Add and save the new catagery
            _db.Categories.Add(category);
            _db.SaveChanges();

            return Ok(category);
        }
        [HttpDelete("DeleteItem{id}")]
        public IActionResult DeleteItem(int id)
        {



            if (id <= 0)
            {
                return BadRequest("ID parameter is required.");
            }

            var category = _db.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            _db.Categories.Remove(category);
            _db.SaveChanges();
            return NoContent(); // Return the deleted category or a success message
        }
        [HttpPut("GetCategoryById/{id}")]
        public IActionResult UpdateCategoryById([FromForm] DTOsCategory dto, int id)
        {
            var oldCategory = _db.Categories.Find(id);
            if (oldCategory == null) return BadRequest();

            var b = SaveImage1(dto.Image);

            oldCategory.Name = dto.Name;
            oldCategory.Image = b;
            oldCategory.Description = dto.Description;

            _db.SaveChanges();
            return Ok(oldCategory);
        }
    }
}
