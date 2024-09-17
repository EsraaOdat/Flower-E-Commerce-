using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFillAutomaticController : ControllerBase
    {
        private readonly MyDbContext _db;
        public UserFillAutomaticController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserId == id);


            return Ok(user);
        }
    }
}
