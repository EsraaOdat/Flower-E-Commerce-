using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Product
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

    public DateOnly? Date { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
