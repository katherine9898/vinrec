public class OrderDto {
  public string Status { get; set; } = string.Empty;
  public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
  public double ShippingFee { get; set; }
  public double Tax { get; set; }
  public double Subtotal { get; set; }
  public double Total { get; set; }
  public AddressDto? ShippingAddress { get; set; }
  public AddressDto? BillingAddress { get; set; }
  public bool? IsSameAddress { get; set; } = false;
  public string DeliveryMethod { get; set; } = string.Empty;
  public bool IsGuestOrder { get; set; } = false;
  public Guid? CustomerId { get; set; }
  public string PaymentMethodId { get; set; } = string.Empty;
  public string? Email { get; set; } = string.Empty;
}