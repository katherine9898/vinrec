public class PaymentTransaction {
  public Guid PaymentTransactionId { get; set; }
  public Guid OrderId { get; set; }
  public string StripeTransactionId { get; set; }
  public Order? Order { get; set; }
}