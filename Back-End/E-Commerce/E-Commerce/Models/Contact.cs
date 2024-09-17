using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Contact
{
    public int ContactId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Sub { get; set; }

    public string? Message { get; set; }

    public DateOnly? SentDate { get; set; }

    public string? AdminResponse { get; set; }

    public DateOnly? ResponseDate { get; set; }

    public int? Status { get; set; }
}
