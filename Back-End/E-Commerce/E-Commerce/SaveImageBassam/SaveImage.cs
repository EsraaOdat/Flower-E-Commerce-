namespace E_Commerce.SaveImageBassam
{
    public class SaveImage
    {
        public static string SaveImage1(IFormFile image)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            // Create directory if it doesn't exist
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generate unique file name to avoid overwriting
            var uniqueFileName =image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                // Use async await to properly handle the file saving
                image.CopyTo(fileStream);
            }

            // Return the relative path to be saved in the database
            return uniqueFileName;
        }
    }
}
