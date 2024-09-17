﻿using System.Text;

namespace E_Commerce.DTOs
{
    public class PasswordHasher
    {
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //var hmac = new System.Security.Cryptography.HMACSHA256()
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key; // The Key property provides a randomly generated salt.
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }



        public static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            //var hmac = new System.Security.Cryptography.HMACSHA256(storedSalt)
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }
    }
}
