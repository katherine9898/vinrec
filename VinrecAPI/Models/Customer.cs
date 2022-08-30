public class Customer{
  public Guid CustomerId { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public Guid? ShippingAddressId { get; set; }
  public Address? ShippingAddress { get; set; }
  public Guid? BillingAddressId { get; set; }
  public Address? BillingAddress { get; set; }
  public List<Order>? Orders { get; set; }
  public Guid UserAuthId { get; set; }
  public UserAuth? UserAuth { get; set; }
}