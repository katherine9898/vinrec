using Microsoft.EntityFrameworkCore;

namespace VinrecAPI.Data
{
  public class DataContext : DbContext {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    
    public DbSet<Customer>? Customers { get; set; }
    public DbSet<Order>? Orders { get; set; }
    public DbSet<OrderItem>? OrderItems { get; set; }
    public DbSet<VinylRecord>? VinylRecords { get; set; }
    public DbSet<UserAuth>? UserAuths { get; set; }
    public DbSet<Address>? Addresses { get; set; }
    public DbSet<PaymentTransaction>? PaymentTransactions { get; set; }
  }
}