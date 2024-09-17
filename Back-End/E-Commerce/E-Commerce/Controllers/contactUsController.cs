using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MailKit.Net.Smtp;
using MimeKit;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class contactUsController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ILogger<contactUsController> _logger;


        public contactUsController(MyDbContext db, ILogger<contactUsController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet("getAllContact")]
        public IActionResult getAllContact() {
            return Ok(_db.Contacts.OrderByDescending(c => c.ContactId).ToList());
        }

        [HttpGet("getContactByStatus")]
        public IActionResult getContactByStatus() { 
            var contact = _db.Contacts.Where(l => l.Status == 0).ToList();
            return Ok(contact);
        }

        [HttpPost("userForm")]
        public IActionResult userForm([FromForm] contactPOST form)
        {
            var data = new Contact
            {
                Name = form.Name,
                Email = form.Email,
                Sub = form.Sub,
                Message = form.Message,
                SentDate = DateOnly.FromDateTime(DateTime.Now),
                Status = 0,
            };
            _db.Contacts.Add(data);
            _db.SaveChanges();
            return Ok(data);

        }

        [HttpGet("getFormById/{id}")]
        public IActionResult getFormById(int id) {
            var contact = _db.Contacts.FirstOrDefault(c => c.ContactId == id);
            return Ok(contact);
        }

        [HttpPut("adminForm/{id}")]
        public IActionResult adminForm(int id, [FromForm] contactPUT form)
        {
            var data = _db.Contacts.FirstOrDefault(l => l.ContactId == id);

            if (data == null)
            {
                return BadRequest();
            }

            data.AdminResponse = form.AdminResponse;
            data.ResponseDate = DateOnly.FromDateTime(DateTime.Now);
            data.Status = 1;

            _db.Contacts.Update(data);
            _db.SaveChanges();

            try
            {
                string fromEmail = data.Email;
                string fromName = "test";
                string subjectText = "subject";
                string messageText = $@"
                    <html>
                    <body>
                        <h2>Hello</h2>
                        <p>{form.AdminResponse}</p>
                        <p>If you have any more questions, feel free to reach out to us.</p>
                        <p>With best regards,<br>Admin</p>
                    </body>
                    </html>";
                string toEmail = data.Email;
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 465; // Port 465 for SSL

                string smtpUsername = "election2024jordan@gmail.com";
                string smtpPassword = "zwht jwiz ivfr viyt"; // Ensure this is correct

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = subjectText;
                message.Body = new TextPart("html") { Text = messageText };

                using (var client = new SmtpClient())
                {
                    client.Connect(smtpServer, smtpPort, true); // Use SSL
                    client.Authenticate(smtpUsername, smtpPassword);
                    client.Send(message);
                    client.Disconnect(true);
                }
            }catch { return BadRequest(); }
            
            return Ok(data);

        }


        
    }
}
