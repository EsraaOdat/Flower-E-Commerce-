using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int? UserId { get; set; }

    public int? ProductId { get; set; }

    public string? Comment1 { get; set; }

    public int? Status { get; set; }

    public DateOnly? Date { get; set; }

    public int? Rating { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? User { get; set; }
}
