using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Copon
{
    public int CoponId { get; set; }

    public string? Name { get; set; }

    public decimal? Amount { get; set; }

    public DateOnly? Date { get; set; }

    public int? Status { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
