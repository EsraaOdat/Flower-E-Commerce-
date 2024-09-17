namespace E_Commerce.DTOs
{
    public class SmtpSettings
    {
        public string Server { get; set; } = "smtp.gmail.com";
        public int Port { get; set; } = 465;
        public string SenderName { get; set; } = "bassambanyali@gmail.com";
        public string SenderEmail { get; set; } = "bassambanyali@gmail.com";
        public string Username { get; set; } = "bassambanyali@gmail.com";
        public string Password { get; set; } = "rdwbbchccqzaocxm"; // Ensure you're using an app-specific password.
        public bool EnableSsl { get; set; } = true; // Set to true for Gmail
    }
}
