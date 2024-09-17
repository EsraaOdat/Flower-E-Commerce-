namespace E_Commerce.Dto
{
    public class ChangePasswordDTO
    {
        public int UserId { get; set; }

        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }

}
