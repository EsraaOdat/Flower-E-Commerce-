using E_Commerce.Models;

namespace E_Commerce.DTOs
{
    public class RatingDTO
    {
        public int ProductId { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        public decimal? Price { get; set; }

        public int? CategoryId { get; set; }

        public string? Color { get; set; }

        public int? FlowerColorId { get; set; }

        public decimal? PriceWithDiscount { get; set; }

        public decimal? rating { get; set; }

        public int ReviewCount { get; set; }

    }
}
