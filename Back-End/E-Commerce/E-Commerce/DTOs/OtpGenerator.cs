namespace E_Commerce.DTOs
{
    public class OtpGenerator
    {
        private static readonly Random _random = new Random();

        public static string GenerateOtp(int length = 6)
        {
            var otp = "";
            for (int i = 0; i < length; i++)
            {
                otp += _random.Next(0, 10).ToString(); // Generate a single digit and append it
            }
            return otp;
        }
    }
}
