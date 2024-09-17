using E_Commerce.Dto;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;

        public UsersController(MyDbContext db)
        {
            _db = db;

        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { message = "Invalid ID. The ID must be a positive integer." });
            }

            var user = _db.Users.Find(id);

            if (user == null)
            {
                return NotFound(new { message = $"User with ID {id} not found." });
            }

            return Ok(user);
        }



        [HttpPut]
        [Route("UpdateUser/{id}")]

        public IActionResult UpdateUser(int id, [FromForm] UsersRequestDTO updatedUser)
        {
            var existingUser = _db.Users.Find(id);
            if (existingUser == null)
            {
                return NotFound(new { message = $"User with ID {id} not found." });
            }
            existingUser.Name = updatedUser.Name ?? existingUser.Name;

            existingUser.Email = updatedUser.Email ?? existingUser.Email;


            existingUser.PhoneNumber = updatedUser.PhoneNumber ?? existingUser.PhoneNumber;
            existingUser.Password = updatedUser.Password ?? existingUser.Password;

            _db.Users.Update(existingUser);
            _db.SaveChanges();
            return Ok(new { message = "User updated successfully.", user = existingUser });
        }


        [HttpPost]
        [Route("ChangePassword")]
        public IActionResult ChangePassword([FromForm] ChangePasswordDTO request)
        {
            if (request.UserId <= 0)
            {
                return BadRequest(new { message = "Invalid User ID." });
            }

            var user = _db.Users.Find(request.UserId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (!PasswordHasherMethod.VerifyPasswordHash(request.CurrentPassword, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest(new { message = "Old password is incorrect." });
            }

            if (request.NewPassword != request.ConfirmNewPassword)
            {
                return BadRequest(new { message = "New password and confirmation do not match." });
            }

            PasswordHasherMethod.CreatePasswordHash(request.NewPassword, out byte[] newPasswordHash, out byte[] newPasswordSalt);

            user.PasswordHash = newPasswordHash;
            user.PasswordSalt = newPasswordSalt;
            user.Password = request.NewPassword;

            try
            {
                _db.Users.Update(user);
                _db.SaveChanges();
                return Ok(new { message = "Password changed successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while saving changes." });
            }
        }

        [HttpPut("IncreaseUserPoints/{id}")]
        public IActionResult IncreasePoints(int id)
        {
            var user = _db.Users.Find(id);
            if (user.Points == null)
            {
                user.Points = 0;
            }

            user.Points += 5;

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(user);

        }


        [HttpPut("SetPointsToZero/{id}")]
        public IActionResult SetPointsToZero(int id)
        {
            var user = _db.Users.Find(id);
            if (user.Points == null)
            {
                user.Points = 0;
            }

            user.Points = 0;

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(user);

        }
    }
}
