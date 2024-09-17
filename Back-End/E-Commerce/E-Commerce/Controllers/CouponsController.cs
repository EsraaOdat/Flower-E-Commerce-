using E_Commerce.Dto_Esraa;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers.Esraa
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CouponsController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/Coupons
        [HttpGet]
        public IActionResult GetAllCoupons()
        {
            var coupons = _db.Copons.ToList();
            return Ok(coupons);
        }

        // GET: api/Coupons/{id}
        [HttpGet("{id}")]
        public IActionResult GetCouponById(int id)
        {
            var coupon = _db.Copons.FirstOrDefault(c => c.CoponId == id);
            if (coupon == null)
                return NotFound(new { message = "Coupon not found" });

            return Ok(coupon);
        }

        // POST: api/Coupons/Add
        [HttpPost("Add")]
        public IActionResult AddCoupon([FromForm] AddCouponDTO couponDto)
        {


            var newCoupon = new Copon
            {
                Name = couponDto.Name,
                Amount = couponDto.Amount,
                Date = couponDto.Date,
                Status = couponDto.Status,

            };

            _db.Copons.Add(newCoupon);
            _db.SaveChanges();

            return Ok(new { message = "Coupon added successfully", coupon = newCoupon });
        }

        // PUT: api/Coupons/Update/{id}
        [HttpPut("Update/{id}")]
        public IActionResult UpdateCoupon(int id, [FromBody] UpdateCouponDTO couponDto)
        {


            var existingCoupon = _db.Copons.FirstOrDefault(c => c.CoponId == id);
            if (existingCoupon == null)
                return NotFound(new { message = "Coupon not found" });

            existingCoupon.Status = couponDto.Status;

            _db.Copons.Update(existingCoupon);
            _db.SaveChanges();

            return Ok(new { message = "Coupon updated successfully", coupon = existingCoupon });
        }

        // DELETE: api/Coupons/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteCoupon(int id)
        {
            var coupon = _db.Copons.FirstOrDefault(c => c.CoponId == id);
            if (coupon == null)
                return NotFound(new { message = "Coupon not found" });

            _db.Copons.Remove(coupon);
            _db.SaveChanges();

            return Ok(new { message = "Coupon deleted successfully" });
        }
    }
}