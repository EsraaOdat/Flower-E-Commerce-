//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace E_Commerce.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class PaymentController : ControllerBase
//    {
//        private readonly PayPalPaymentService _payPalService;
//        private readonly string _redirectUrl;

//        public PaymentController(PayPalPaymentService payPalService, IConfiguration config)
//        {
//            _payPalService = payPalService;
//            _redirectUrl = config["PayPal:RedirectUrl"];
//        }

//        [HttpPost("create")]
//        public IActionResult CreatePayment()
//        {
//            var payment = _payPalService.CreatePayment(_redirectUrl);
//            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

//            return Ok(new { approvalUrl });
//        }

//        [HttpGet("success")]
//        public IActionResult ExecutePayment(string paymentId, string PayerID)
//        {
//            var executedPayment = _payPalService.ExecutePayment(paymentId, PayerID);
//            return Ok(executedPayment);
//        }

//        [HttpGet("cancel")]
//        public IActionResult CancelPayment()
//        {
//            return BadRequest("Payment canceled.");
//        }
//    }
//}
