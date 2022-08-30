public class Address{
  public Guid AddressId { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string AddressLine1 { get; set; } = string.Empty;
  public string AddressLine2 { get; set; } = string.Empty;
  public string City { get; set; } = string.Empty;
  public string PostalCode { get; set; } = string.Empty;
  public string State { get; set; } = string.Empty;
  public string Country { get; set; } = string.Empty;
  public string? PhoneNumber { get; set; } = string.Empty;
  public string? Type { get; set; } = "SB";
}