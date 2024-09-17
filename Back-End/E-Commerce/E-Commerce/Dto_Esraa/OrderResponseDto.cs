using System;
using System.Collections.Generic; // For List

namespace E_Commerce.Dto
{
    public class OrderResponseDto
    {
        public int OrderId { get; set; }

        public string OrderNumber => $"#GK{OrderId:D5}"; // Formatting the order number

        public UserDto Customer { get; set; } // Customer info (UserDto contains UserId and Name)

        public DateOnly? Date { get; set; }

        public int NumberOfItems { get; set; } // Total number of items in the order

        public decimal Total { get; set; } // Total price for the order

        public string? Status { get; set; } // Current status of the order (e.g., Shipped, Cancelled)

        public List<OrderItemDto> OrderItem { get; set; } // List of items in the order
    }

    public class UserDto
    {
        public string? Name { get; set; } // Customer name
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } // Product name
        public int? Quantity { get; set; }
        public decimal? Price { get; set; } // Product price
    }
}
