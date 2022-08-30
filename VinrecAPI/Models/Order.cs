public class Order {
  public Guid OrderId { get; set; }
  public DateTime OrderDate { get; set; }
  public string Status { get; set; } = string.Empty;
  public virtual ICollection<OrderItem>? OrderItems { get; set; }
  public double ShippingFee { get; set; }
  public double Tax { get; set; }
  public double Subtotal { get; set; }
  public double Total { get; set; }
  public Guid? ShippingAddressId { get; set; }
  public Guid? BillingAddressId { get; set; }
  public Address? ShippingAddress { get; set; }
  public Address? BillingAddress { get; set; }
  public string DeliveryMethod { get; set; } = string.Empty;
  public bool IsGuestOrder { get; set; } = false;
  public Guid? CustomerId { get; set; }
  public Customer? Customer { get; set; }
  public string? Email { get; set; } = string.Empty;

}