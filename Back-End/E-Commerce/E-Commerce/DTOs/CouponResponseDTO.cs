namespace E_Commerce.DTOs
{
    public class CouponResponseDTO
    {
        public string? Name { get; set; }

        public decimal? Amount { get; set; }

        public DateOnly? Date { get; set; }

        public int? Status { get; set; }
    }
}
