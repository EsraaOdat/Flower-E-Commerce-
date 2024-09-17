public class OrderDetailsDto
{
    public int OrderId { get; set; }
    public DateOnly? Date { get; set; }
    public string Status { get; set; }
    public decimal TotalAmount { get; set; }

    // قائمة المنتجات
    public List<OrderItemDto> OrderItems { get; set; }

    // معلومات العميل
    public CustomerDto Customer { get; set; }

    // معلومات الكوبون
    public CouponDto Coupon { get; set; }  // إضافة الكوبون

    // Nested DTOs
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductImage { get; set; }
    }

    public class CustomerDto
    {
        public string Name { get; set; }
        public string? Image { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    // معلومات الكوبون
    public class CouponDto
    {
        public string? Name { get; set; }
        public decimal? Amount { get; set; }
    }
}
