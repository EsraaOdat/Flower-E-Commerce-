using E_Commerce.DTOS_rania;
using System.Collections.Generic;

namespace E_Commerce.DTO
{
    public class ProductDTO
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }

        public int? FlowerColorId { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? PriceWithDiscount { get; set; }  // Added field for price with discount
        public string? Color { get; set; }  // Added field for color
        public int CategoryId { get; set; }
        public List<CommentsDTO>? Comments { get; set; }
        public List<rania>? Commentss { get; set; }
    }

    public class CommentsDTO
    {
        public string? Comment1 { get; set; }

        public int? UserId { get; set; }

        //public DateOnly? Date { get; set; }

        public string? UserName { get; set; }



    }


    public class ProductDetailsDTO
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; } // As string to handle image URLs
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? PriceWithDiscount { get; set; }
        public string? Color { get; set; }
        public int? CategoryId { get; set; }
        public List<CommentsDTO> Comments { get; set; }
    }
}
