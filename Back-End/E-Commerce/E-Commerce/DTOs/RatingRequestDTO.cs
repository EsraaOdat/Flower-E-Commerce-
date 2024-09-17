namespace E_Commerce.DTOs
{
    public class RatingRequestDTO
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }  // Rating between 1 and 5
    }
}
