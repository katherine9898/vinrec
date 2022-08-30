public class UserAuth {
  public Guid UserAuthId { get; set; }
  public string Username { get; set; }
  public byte[] PasswordHash { get; set; }
  public byte[] PasswordSalt { get; set; }
  public string Role { get; set; } = "Customer";
}