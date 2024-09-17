namespace E_Commerce.Dto
{
    public class PasswordHasherMethod
    {
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;  // إنشاء "Salt" بشكل عشوائي
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));  // إنشاء "Hash" لكلمة المرور
            }
        }

        public static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);  // مقارنة "Hash" المدخل مع "Hash" المخزن
            }
        }
    }

}
