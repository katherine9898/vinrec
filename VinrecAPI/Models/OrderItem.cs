public class OrderItem {
  public Guid OrderItemId { get; set; }
  public Guid OrderId { get; set; }
  public Guid VinylRecordId { get; set; }
  public VinylRecord? VinylRecord { get; set; }
  public int Quantity { get; set; }
}