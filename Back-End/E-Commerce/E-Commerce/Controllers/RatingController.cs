using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly MyDbContext _db;

        public RatingController(MyDbContext db)
        {
            _db = db;
        }

        [HttpPost("SubmitRating")]
        public IActionResult SubmitRating([FromBody] RatingRequestDTO ratingDTO)
        {
            // Check if the user has already rated this product
            var existingComment = _db.Comments.FirstOrDefault(c => c.ProductId == ratingDTO.ProductId && c.UserId == ratingDTO.UserId);
            if (existingComment != null)
            {
                return BadRequest("You have already rated this product.");
            }

            // Create a new rating entry in the Comment table
            var newComment = new Comment
            {
                UserId = ratingDTO.UserId,
                ProductId = ratingDTO.ProductId,
                Rating = ratingDTO.Rating,
                Date = DateOnly.FromDateTime(DateTime.Now),  // Capture the rating date
                Status = 0  // Assuming 1 means active
            };

            _db.Comments.Add(newComment);
            _db.SaveChanges();

            return Ok(newComment);
        }
    }
}
