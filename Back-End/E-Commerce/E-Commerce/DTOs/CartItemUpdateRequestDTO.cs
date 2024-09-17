namespace E_Commerce.DTOs
{
    public class CartItemUpdateRequestDTO
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int QuantityChange { get; set; }  // Positive for increment, negative for decrement (from the front end)
    }
}
