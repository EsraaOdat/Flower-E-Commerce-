using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public decimal? Amount { get; set; }

    public int? CoponId { get; set; }

    public string? Status { get; set; }

    public string? TransactionId { get; set; }

    public DateOnly? Date { get; set; }

    public virtual Copon? Copon { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User? User { get; set; }
}
