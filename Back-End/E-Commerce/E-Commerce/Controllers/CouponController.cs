using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CouponController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetCoupunByName/{name}")]
        public IActionResult GetCoupunByName(string name)
        {

            var coupon = _db.Copons
                .Where(c => c.Name == name)
                .Select(c => new CouponResponseDTO
                {
                    Name = c.Name,
                    Amount = c.Amount,
                    Date = c.Date,
                    Status = c.Status,
                })
                .FirstOrDefault();

            var coponnew = _db.Copons.Where(c => c.Name == name).FirstOrDefault();

            if (coupon == null)
            {
                return NotFound(new { message = $"No coupon named {name} found" });
            }

            if (coupon.Date.HasValue && coupon.Date.Value > DateOnly.FromDateTime(DateTime.Today))
            {
                return Ok(coponnew);
            }
            else
            {
                return BadRequest(new { message = "Coupon is expired or not valid" });
            }
        }

        //[HttpGet("GetCoupunIDByName/{name}")]
        //public IActionResult GetCoupunIDByName(string name)
        //{
        //    var id = _db.Copons.Where()

        //    return Ok();

        //}
    }
}
