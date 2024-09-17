using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ILogger<HomeController> _logger;


        public HomeController (MyDbContext db, ILogger<HomeController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet("getAllCategories")]
        public IActionResult getAllCategories()
        {
            var category = _db.Categories.ToList();

            return Ok(category);

        }

        [HttpGet("TopSales")]
        public IActionResult TopSales() {
            var productTop = _db.OrderItems
                        .GroupBy(oi => oi.ProductId)  
                        .Select(group => new
                        {
                            ProductId = group.Key,
                            Count = group.Count()  
                        })
                        .OrderByDescending(x => x.Count) 
                        .Take(5)
                        .Join(_db.Products,  
                              g => g.ProductId,
                              p => p.ProductId,
                              (g, p) => p)
                        .ToList();

            return Ok(productTop);

        }

        [HttpGet("NewArrival")]
        public IActionResult NewArrival()
        {
            var newProduct = _db.Products.OrderByDescending(l => l.Date).Take(5).ToList();
            return Ok(newProduct);
        }

        [HttpGet("OffSale")]
        public IActionResult OffSale() { 
            var product = _db.Products.OrderByDescending(oi => oi.PriceWithDiscount).Take(5).ToList();
            return Ok(product);
        }

        [HttpGet("TopProducts")]
        public IActionResult TopProducts() {
            var productsWithRatings = _db.Products
            .Select(product => new RatingDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Image = product.Image,
                Price = product.Price,
                CategoryId = product.CategoryId,
                Color = product.Color,
                FlowerColorId = product.FlowerColorId,
                PriceWithDiscount = product.PriceWithDiscount,
                // Calculate the average rating from the comments, if there are any
                rating = _db.Comments
                          .Where(c => c.ProductId == product.ProductId)
                          .Average(c => (decimal?)c.Rating) ?? 0 ,// If there are no comments, set the rating to 0

                 ReviewCount = _db.Comments
                              .Where(c => c.ProductId == product.ProductId)
                              .Count() // Count number of reviews (comments)
            })
            .OrderByDescending(x => x.rating)
            .Take(5)
            .ToList();


            return Ok(productsWithRatings);

        }

        [HttpGet("TopProduct/{id}")]
        public IActionResult TopProductWithId(int id)
        {
            var productsWithRatings = _db.Products.Where(l => l.ProductId == id)
            .Select(product => new RatingDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Image = product.Image,
                Price = product.Price,
                CategoryId = product.CategoryId,
                Color = product.Color,
                FlowerColorId = product.FlowerColorId,
                PriceWithDiscount = product.PriceWithDiscount,
                // Calculate the average rating from the comments, if there are any
                rating = _db.Comments
                          .Where(c => c.ProductId == product.ProductId)
                          .Average(c => (decimal?)c.Rating) ?? 0,// If there are no comments, set the rating to 0

                ReviewCount = _db.Comments
                              .Where(c => c.ProductId == product.ProductId)
                              .Count() // Count number of reviews (comments)
            })
            .FirstOrDefault();
            ;


            return Ok(productsWithRatings);

        }

        //[HttpGet("CartNavbar")]
        //public IActionResult CartNavbar() { 
        //    var cart
        //}


    }
}
