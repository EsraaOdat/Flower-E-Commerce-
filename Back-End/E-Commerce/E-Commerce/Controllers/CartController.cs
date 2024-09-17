using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly ILogger<CartController> _logger;


        public CartController(MyDbContext db, ILogger<CartController> logger)
        {
            _db = db;
            _logger = logger;
        }



        ////////////////////////// Get All CART Items >>> Response //////////////////////////

        [HttpGet("GetAllCartItems")]
        public IActionResult GetAllCartItems()
        {

            var cartItems = _db.CartItems.Select(c =>
            new CartItemResponseDTOs
            {
                CartItemId = c.CartItemId,
                ProductId = c.ProductId,
                UserId = c.UserId,
                Quantity = c.Quantity,

                prodcutDTO = new ProductResponseDTO
                {
                    Name = c.Product.Name,
                    Description = c.Product.Description,
                    Image = c.Product.Image,
                    Price = c.Product.Price,
                    Color = c.Product.Color,
                    FlowerColorId = c.Product.FlowerColorId,
                    PriceWithDiscount = c.Product.PriceWithDiscount,

                }
            }
            );

            if (!cartItems.Any())

            {
                return BadRequest("No Cart Items Found");
            }

            return Ok(cartItems);
        }







        ////////////////////////// Get NEW CART Item By User ID >>> Response //////////////////////////

        [HttpGet("GetAllCartItemsByUserId/{userId:int}")]

        public IActionResult GetCartItemsByUserId(int userId)
        {



            if (userId <= 0)
            {
                return BadRequest($"User Id must be greater than 0");
            }

            var cartItems = _db.CartItems.Where(c => c.UserId == userId).Select(c =>

            new CartItemResponseDTOs
            {
                CartItemId = c.CartItemId,
                ProductId = c.ProductId,
                UserId = c.UserId,
                Quantity = c.Quantity,

                prodcutDTO = new ProductResponseDTO
                {
                    Name = c.Product.Name,
                    Description = c.Product.Description,
                    Image = c.Product.Image,
                    Price = c.Product.Price,
                    Color = c.Product.Color,
                    FlowerColorId = c.Product.FlowerColorId,
                    PriceWithDiscount = c.Product.PriceWithDiscount,

                }
            }

            );



            if (!cartItems.Any())
            {
                return NotFound($"No Cart Items Found for user with id {userId}");

            }

            return Ok(cartItems);

        }



        ////////////////////////// CREATE new CART Item>> Request //////////////////////////


        [HttpPost("CreateNewCartItem")]
        public IActionResult CreateNewCartItem([FromBody] CartItemRequestDTOs CartItemDTO)
        {
            if (CartItemDTO == null)
            {
                return BadRequest("Your request doesn't contain data!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingCartItem = _db.CartItems.FirstOrDefault(c => c.UserId == CartItemDTO.UserId && c.ProductId == CartItemDTO.ProductId);

                if (existingCartItem != null)
                {
                    // Item exists, update the quantity
                    existingCartItem.Quantity += CartItemDTO.Quantity;
                    _db.CartItems.Update(existingCartItem);
                    _db.SaveChanges();

                    return Ok(new { item = existingCartItem, msg = "Item quantity updated" });
                }

                var newCartItem = new CartItem
                {
                    ProductId = CartItemDTO.ProductId,
                    UserId = CartItemDTO.UserId,
                    Quantity = CartItemDTO.Quantity,
                };
                _db.CartItems.Add(newCartItem);
                _db.SaveChanges();

                var returnContent = new
                {
                    item = newCartItem,
                    msg = "New Item Added"
                };

                return Ok(returnContent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }




        [HttpPut("UpdateCartItem")]
        public IActionResult UpdateCartItem([FromBody] CartItemUpdateRequestDTO CartItemUpdate)

        {
            if (CartItemUpdate == null)
            {
                return BadRequest("Your request doesn't contain data!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingCartItem = _db.CartItems.FirstOrDefault(c => c.UserId == CartItemUpdate.UserId && c.ProductId == CartItemUpdate.ProductId);

                if (existingCartItem == null)
                {
                    return NotFound("Item not found in the cart.");
                }

                // Increment or Decrement based on the incoming value
                existingCartItem.Quantity += CartItemUpdate.QuantityChange; // Positive for increment, negative for decrement

                // Ensure quantity doesn't go below 1
                if (existingCartItem.Quantity <= 0)
                {
                    _db.CartItems.Remove(existingCartItem);
                    _db.SaveChanges();

                    return Ok(new { msg = "Item removed from the cart." });
                }

                _db.CartItems.Update(existingCartItem);
                _db.SaveChanges();

                return Ok(new { item = existingCartItem, msg = "Item Updated" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }






        [HttpDelete("DeleteCartItem/{cartItemId:int}")]
        public IActionResult DeleteCartItem(int cartItemId)
        {
            if (cartItemId <= 0)
            {
                return BadRequest("CartItemId must be greater than 0.");
            }

            var cartItem = _db.CartItems.FirstOrDefault(c => c.CartItemId == cartItemId);

            if (cartItem == null)
            {
                return NotFound($"No cart item found with id {cartItemId}");
            }

            _db.CartItems.Remove(cartItem);
            _db.SaveChanges();

            return Ok(new { msg = "Cart item deleted successfully" });
        }


    }
}
