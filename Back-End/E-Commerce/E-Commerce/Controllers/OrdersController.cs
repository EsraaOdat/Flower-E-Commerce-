using E_Commerce.Dto;
using E_Commerce.Dto_Esraa;
using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _db;

        public OrdersController(MyDbContext db)
        {
            _db = db;

        }


        [HttpGet]
        [Route("AllOrders")]
        public IActionResult GetAllOrders()
        {
            var orders = _db.Orders
                .Select(order => new OrderResponseDto
                {
                    OrderId = order.OrderId,
                    Date = order.Date,

                    // Customer information
                    Customer = new UserDto
                    {
                        Name = order.User.Name
                    },

                    // Calculate the total number of items
                    NumberOfItems = order.OrderItems.Sum(oi => oi.Quantity ?? 0),

                    // Calculate the total price of the order
                    Total = order.OrderItems.Sum(oi => (oi.Quantity ?? 0) * (oi.Product.Price ?? 0)),

                    // Status of the order
                    Status = order.Status,

                    // Map each order item to OrderItemDto
                    OrderItem = order.OrderItems.Select(oi => new OrderItemDto
                    {
                        ProductId = oi.Product.ProductId,
                        ProductName = oi.Product.Name,
                        Quantity = oi.Quantity,
                        Price = oi.Product.Price
                    }).ToList()
                })
                .ToList();

            return Ok(orders);
        }


        [HttpGet]
        [Route("GetOrdersByUser/{userId}")]
        public IActionResult GetOrdersByUserId(int userId)
        {
            // Retrieve all orders that belong to the specified user
            var orders = _db.Orders
                .Where(order => order.UserId == userId) // Filter by UserId
                .Select(order => new OrderResponseDto
                {
                    OrderId = order.OrderId,
                    Date = order.Date,
                    Customer = new UserDto
                    {
                        Name = order.User.Name
                    },
                    NumberOfItems = order.OrderItems.Sum(oi => oi.Quantity ?? 0),
                    Total = order.OrderItems.Sum(oi => (oi.Quantity ?? 0) * (oi.Product.Price ?? 0)),
                    Status = order.Status,
                    OrderItem = order.OrderItems.Select(oi => new OrderItemDto
                    {
                        ProductId = oi.Product.ProductId,
                        ProductName = oi.Product.Name,
                        Quantity = oi.Quantity,
                        Price = oi.Product.Price
                    }).ToList()
                })
                .ToList();

            // Check if the user has any orders
            if (orders.Count == 0)
            {
                return NotFound(new { message = "No orders found for this user." });
            }

            return Ok(orders);
        }







        [HttpGet]
        [Route("GetOrderItemsByOrderId/{orderId}")]
        public IActionResult GetOrderItemsByOrderId(int orderId)
        {
            // Retrieve all order items that belong to the specified order
            var orderItems = _db.OrderItems
                .Where(oi => oi.OrderId == orderId) // Filter by OrderId
                .Select(oi => new OrderItemDto
                {
                    ProductId = oi.Product.ProductId,

                    ProductName = oi.Product.Name,
                    Quantity = oi.Quantity,
                    Price = oi.Product.Price
                })
                .ToList();

            // Check if the order has any items
            if (orderItems.Count == 0)
            {
                return NotFound(new { message = "No items found for this order." });
            }

            return Ok(orderItems);
        }

        [HttpGet]
        [Route("GetOrderDetails/{orderId}")]
        public IActionResult GetOrderDetails(int orderId)
        {
            var order = _db.Orders
                .Where(o => o.OrderId == orderId)
                .Select(o => new OrderDetailsDto
                {
                    OrderId = o.OrderId,
                    Date = o.Date,
                    Status = o.Status,
                    TotalAmount = o.OrderItems.Sum(oi => (oi.Quantity ?? 0) * (oi.Product.Price ?? 0)),

                    // Products (OrderItems)
                    OrderItems = o.OrderItems.Select(oi => new OrderDetailsDto.OrderItemDto
                    {
                        ProductId = oi.Product.ProductId,
                        ProductName = oi.Product.Name,
                        Quantity = oi.Quantity ?? 0,
                        Price = oi.Product.Price ?? 0,
                        ProductImage = oi.Product.Image // Assuming Image field exists in Product
                    }).ToList(),

                    // Customer (User)
                    Customer = new OrderDetailsDto.CustomerDto
                    {
                        Name = o.User.Name,
                        Email = o.User.Email,
                        Image = o.User.Image,
                        PhoneNumber = o.User.PhoneNumber

                    },

                    // التحقق من وجود كوبون وجلب معلوماته
                    Coupon = new OrderDetailsDto.CouponDto
                    {
                        Name = o.Copon.Name ?? "No Copoun Applied",  // Assuming Coupon has Name
                        Amount = o.Copon.Amount ?? 0// Assuming Coupon has DiscountAmount
                    }
                })
                .FirstOrDefault();

            if (order == null)
            {
                return NotFound(new { message = "Order not found." });
            }

            return Ok(order);
        }




        [HttpPut]
        [Route("UpdateOrderStatus/{orderId}")]
        public IActionResult UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDto updateOrderStatusDto)
        {
            // Find the order by ID
            var order = _db.Orders.FirstOrDefault(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound(new { message = "Order not found." });
            }

            // Update the status
            order.Status = updateOrderStatusDto.Status;

            // Save changes to the database
            _db.SaveChanges();

            return Ok(new { message = "Order status updated successfully.", orderId = orderId, newStatus = updateOrderStatusDto.Status });
        }




        [HttpGet]
        [Route("AllCategories")]
        public IActionResult GetAllCategories()
        {
            var data = _db.Categories.ToList();
            return Ok(data);
        }
    }
}
