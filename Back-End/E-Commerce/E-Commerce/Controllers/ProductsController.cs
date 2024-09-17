using E_Commerce.DTO;
using E_Commerce.DTOS_rania;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(MyDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }





        //[HttpGet("{id}")]
        //public IActionResult GetProductById(int id)
        //{
        //    var product = _context.Products.Find(id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(product);
        //}

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products
                .Where(p => p.ProductId == id)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefault();

            if (product == null)
            {
                return NotFound();
            }

            var productDetailsDTO = new ProductDetailsDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Image = product.Image,  // Directly assigning string URL
                Price = product.Price,
                PriceWithDiscount = product.PriceWithDiscount,
                Color = product.Color,
                CategoryId = product.CategoryId,
                Comments = product.Comments.Select(c => new CommentsDTO
                {
                    Comment1 = c.Comment1,
                    // Ensure UserName is a property in the User entity
                }).ToList()
            };

            return Ok(productDetailsDTO);
        }








        [HttpPost]
        public IActionResult AddProduct([FromForm] ProductDTO productDto)
        {
            string fileName = null;
            if (productDto.Image != null)
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/images");
                if (!Directory.Exists(uploads))
                {
                    Directory.CreateDirectory(uploads);
                }

                fileName = Path.GetFileName(productDto.Image.FileName);
                var filePath = Path.Combine(uploads, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    productDto.Image.CopyTo(stream);
                }
            }

            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                PriceWithDiscount = productDto.PriceWithDiscount,
                Color = productDto.Color,
                FlowerColorId = productDto.FlowerColorId, // Make sure this line is added
                CategoryId = productDto.CategoryId,
                Image = fileName != null ? "/uploads/images/" + fileName : null
            };

            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
        }


        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] ProductDTO productDto)
        {
            _logger.LogInformation("Updating product with ID {ProductId}", id); // Assuming _logger is configured

            var product = _context.Products.Find(id);
            if (product == null)
            {
                _logger.LogWarning("Product with ID {ProductId} not found", id);
                return NotFound();
            }

            if (productDto.Image != null)
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/images");
                Directory.CreateDirectory(uploads); // No need to check, create if not exists

                var fileName = Path.GetFileName(productDto.Image.FileName);
                var filePath = Path.Combine(uploads, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    productDto.Image.CopyTo(stream);
                }

                var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", product.Image.TrimStart('/'));
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }

                product.Image = "/uploads/images/" + fileName;
            }

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price ?? product.Price; // Use existing if null
            product.PriceWithDiscount = productDto.PriceWithDiscount ?? product.PriceWithDiscount;
            product.Color = productDto.Color; // This might be the color name or another identifier
            product.FlowerColorId = int.TryParse(productDto.Color, out int flowerColorId) ? flowerColorId : (int?)null; // Assuming color is passed as ID
            product.CategoryId = productDto.CategoryId; // Ensure this is captured

            try
            {
                _context.SaveChanges();
                _logger.LogInformation("Product with ID {ProductId} updated successfully", id);
                return Ok(product);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product with ID {ProductId}", id);
                return StatusCode(500, "Internal Server Error");
            }
        }





















        [HttpGet("ByDiscountedPriceRange")]
        public IActionResult GetProductsByDiscountedPriceRange(decimal minPrice, decimal maxPrice)
        {
            var products = _context.Products
                .Where(p => (p.PriceWithDiscount != null && p.PriceWithDiscount >= minPrice && p.PriceWithDiscount <= maxPrice) ||
                            (p.PriceWithDiscount == null && p.Price >= minPrice && p.Price <= maxPrice))
                .ToList();
            return Ok(products);
        }









        [HttpGet("ByColorId/{colorId}")]
        public IActionResult GetProductsByColorId(int colorId)
        {
            var products = _context.Products.Where(p => p.FlowerColorId == colorId).ToList();
            return Ok(products);
        }




        // Add this method to your ProductsController
        [HttpGet("ByCategoryId/{categoryId}")]
        public IActionResult GetProductsByCategoryId(int categoryId)
        {
            var products = _context.Products.Where(p => p.CategoryId == categoryId).ToList();
            if (products == null || !products.Any())
            {
                return NotFound();
            }
            return Ok(products);


        }

        [HttpGet("SearchByName/{name}")]
        public IActionResult SearchProductsByName(string name)
        {
            var products = _context.Products
                .Where(p => p.Name.Contains(name))
                .ToList();
            return Ok(products);
        }


        [HttpPost("{productId:int}/comment")]
        public IActionResult PostComment(int productId, [FromBody] CommentsDTO commentDto)
        {
            // Directly use the UserId passed in the DTO (ensure it's being sent from client-side)
            if (commentDto.UserId == null)
            {
                return BadRequest("User ID must be provided.");
            }

            var comment = new Comment
            {
                UserId = commentDto.UserId.Value,
                ProductId = productId,
                Comment1 = commentDto.Comment1,
                Date = DateOnly.FromDateTime(DateTime.Now),
                Status = 0 // Assuming '1' means approved or visible
            };

            _context.Comments.Add(comment);
            _context.SaveChanges();

            return Ok("Comment added successfully.");
        }






        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _logger.LogInformation("Attempting to delete product with ID {ProductId}", id);

            var product = _context.Products.Find(id);
            if (product == null)
            {
                _logger.LogWarning("Product with ID {ProductId} not found", id);
                return NotFound();
            }

            _context.Products.Remove(product);
            try
            {
                _context.SaveChanges();
                _logger.LogInformation("Product with ID {ProductId} deleted successfully", id);
                return NoContent(); // Returns a 204 status code, indicating successful deletion without content
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting product with ID {ProductId}", id);
                return StatusCode(500, "Internal Server Error");
            }
        }






        [HttpGet("{productId}/comments")]
        public IActionResult GetProductComments(int productId)
        {
            var productComments = _context.Comments
                .Where(c => c.ProductId == productId && c.Status == 1)
                .Select(c => new rania
                {
                    Comment1 = c.Comment1,
                    UserName = c.User.Name,
                    Date = c.Date,
                    // Assuming that you have navigation property 'User' in 'Comment' entity
                })
                .ToList();

            if (!productComments.Any())
            {
                return NotFound("No comments found for this product.");
            }

            return Ok(productComments);
        }

     



    }
}
