using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class ChatMessage
{
    public int Id { get; set; }

    public int? SenderId { get; set; }

    public int? ReceiverId { get; set; }

    public string? Message { get; set; }

    public DateTime? Timestamp { get; set; }

    public string? SenderName { get; set; }

    public string? ReceiverName { get; set; }
}
