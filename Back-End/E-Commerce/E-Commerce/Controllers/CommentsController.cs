using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CommentsController(MyDbContext db)
        {
            _db = db;
        }
        /*
                // إحضار جميع التعليقات المعلقة للمراجعة
                [HttpGet("pending")]
                public ActionResult<IEnumerable<Comment>> GetPendingComments()
                {
                    var pendingComments = _db.Comments.Where(c => c.Status == 0).ToList();
                    return Ok(pendingComments);
                }

                // Endpoint للموافقة على التعليق
                [HttpPut("approve/{id}")]
                public IActionResult ApproveComment(int id)
                {
                    var comment = _db.Comments.Find(id);
                    if (comment == null)
                    {
                        return NotFound("Comment not found");
                    }

                    comment.Status = 1; // اعتماد التعليق
                    _db.SaveChanges();

                    return Ok("Comment approved successfully");
                }

                // Endpoint لرفض التعليق
                [HttpPut("reject/{id}")]
                public IActionResult RejectComment(int id)
                {
                    var comment = _db.Comments.Find(id);
                    if (comment == null)
                    {
                        return NotFound("Comment not found");
                    }

                    _db.Comments.Remove(comment);
                    _db.SaveChanges();

                    return Ok("Comment rejected and removed");
                }*/



        [HttpGet("all")]
        public ActionResult<IEnumerable<object>> GetAllComments()
        {
            var allComments = _db.Comments
                .Select(c => new
                {
                    c.CommentId,
                    c.Comment1,
                    c.Status,
                    c.Date,
                    c.Rating,
                    ProductName = c.Product != null ? c.Product.Name : "Unknown",
                    ProductImage = c.Product != null ? c.Product.Image : "No Image",
                    UserName = c.User != null ? c.User.Name : "Unknown",
                })
                .ToList();

            if (!allComments.Any())
            {
                return NotFound("No comments found.");
            }

            return Ok(allComments);
        }




        [HttpPut("approve/{id}")]
        public IActionResult ApproveComment(int id)
        {
            var comment = _db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            comment.Status = 1;
            _db.SaveChanges();

            return Ok("Comment approved successfully");
        }

        [HttpPut("reject/{id}")]
        public IActionResult RejectComment(int id)
        {
            var comment = _db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            _db.Comments.Remove(comment);
            _db.SaveChanges();

            return Ok("Comment rejected and removed");
        }





    }
}
