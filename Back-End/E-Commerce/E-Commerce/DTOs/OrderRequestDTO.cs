namespace E_Commerce.DTOs
{
    public class OrderRequestDTO
    {
        public int? UserId { get; set; }

        public decimal? Amount { get; set; }

        public int? CoponId { get; set; }

        public string? Status { get; set; }

        public string? TransactionId { get; set; }

    }
}
