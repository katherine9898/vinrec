using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VinrecAPI.Data;
using Stripe;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;
using System.Linq;

namespace VinrecAPI.Controllers
{

    [ApiController]
    [EnableCors("VinrecPolicy")]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public OrderController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(Guid? customerId, string? status, string? deliveryMethod, DateTime? orderDate)
        {
            //TODO: check admin role to see all orders
            var orders = await _context.Orders.ToListAsync();
            if (customerId != null)
            {
                orders = orders.Where(x => x.CustomerId == customerId).ToList();
            }
            if (status != null)
            {
                orders = orders.Where(x => x.Status == status).ToList();
            }
            if (deliveryMethod != null)
            {
                orders = orders.Where(x => x.DeliveryMethod == deliveryMethod).ToList();
            }
            if (orderDate != null)
            {
                orders = orders.Where(x => x.OrderDate == orderDate).ToList();
            }
            return orders;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            //TODO: check if user belongs to order before return it
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDto order)
        {
            try
            {
                // create order
                var customerOrder = new Order
                {
                    OrderId = Guid.NewGuid(),
                    Email = order.Email,
                    OrderDate = DateTime.Now,
                    DeliveryMethod = order.DeliveryMethod,
                    Status = order.Status,
                    ShippingFee = order.ShippingFee,
                    Tax = order.Tax,
                    Subtotal = order.Subtotal,
                    Total = order.Total,
                    IsGuestOrder = order.IsGuestOrder,
                };

                // add addresses to database
                if (order.IsSameAddress == true)
                {
                    var addressId = Guid.NewGuid();
                    _context.Addresses.Add(
                        new Address
                        {
                            AddressId = addressId,
                            FirstName = order.ShippingAddress.FirstName,
                            LastName = order.ShippingAddress.LastName,
                            AddressLine1 = order.ShippingAddress.AddressLine1,
                            AddressLine2 = order.ShippingAddress.AddressLine2,
                            City = order.ShippingAddress!.City,
                            Country = order.ShippingAddress.Country,
                            State = order.ShippingAddress.State,
                            PostalCode = order.ShippingAddress.PostalCode,
                            PhoneNumber = order.ShippingAddress.PhoneNumber,
                            Type = "SB"
                        }
                    );
                    customerOrder.ShippingAddressId = addressId;
                    customerOrder.BillingAddressId = addressId;
                }
                else
                {
                    var ShippingAddressId = Guid.NewGuid();
                    var BillingAddressId = Guid.NewGuid();
                    _context.Addresses.Add(
                        new Address
                        {
                            AddressId = ShippingAddressId,
                            FirstName = order.ShippingAddress.FirstName,
                            LastName = order.ShippingAddress.LastName,
                            AddressLine1 = order.ShippingAddress.AddressLine1,
                            AddressLine2 = order.ShippingAddress.AddressLine2,
                            City = order.ShippingAddress!.City,
                            Country = order.ShippingAddress.Country,
                            State = order.ShippingAddress.State,
                            PostalCode = order.ShippingAddress.PostalCode,
                            PhoneNumber = order.ShippingAddress.PhoneNumber,
                            Type = "S"
                        }
                    );

                    _context.Addresses.Add(
                        new Address
                        {
                            AddressId = BillingAddressId,
                            FirstName = order.BillingAddress.FirstName,
                            LastName = order.BillingAddress.LastName,
                            AddressLine1 = order.BillingAddress.AddressLine1,
                            AddressLine2 = order.BillingAddress.AddressLine2,
                            City = order.BillingAddress!.City,
                            Country = order.BillingAddress.Country,
                            State = order.BillingAddress.State,
                            PostalCode = order.BillingAddress.PostalCode,
                            PhoneNumber = order.BillingAddress.PhoneNumber,
                            Type = "B"
                        }
                    );
                    customerOrder.ShippingAddressId = ShippingAddressId;
                    customerOrder.BillingAddressId = BillingAddressId;
                }

                _context.Orders.Add(customerOrder);


                foreach (var item in order.OrderItems)
                {
                    var orderItem = new OrderItem
                    {
                        OrderItemId = Guid.NewGuid(),
                        OrderId = customerOrder.OrderId,
                        VinylRecordId = item.VinylRecordId,
                        Quantity = item.Quantity,
                    };
                    _context.OrderItems.Add(orderItem);

                    var vinylRecord = await _context.VinylRecords.FindAsync(item.VinylRecordId);
                    vinylRecord.Quantity -= item.Quantity;
                    if (vinylRecord.Quantity < 0)
                    {
                        return BadRequest($"Not enough {vinylRecord.Title} vinyl records in stock");
                    }
                    else if (vinylRecord.Quantity == 0)
                    {
                        vinylRecord.Status = "Out of stock";
                    }
                    _context.VinylRecords.Update(vinylRecord);
                }

                // process payment
                StripeConfiguration.ApiKey = _configuration.GetSection("AppSettings:STRIPE_SECRET_KEY").Value;

                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(order.Total * 100),
                    Currency = "usd",
                    PaymentMethod = order.PaymentMethodId,
                    PaymentMethodTypes = new List<string> { "card" },
                    Description = "Vinrec Order",
                    ReceiptEmail = order.Email,
                    Confirm = true
                };

                var service = new PaymentIntentService();
                PaymentIntent intent = service.Create(options);

                var transaction = new PaymentTransaction
                {
                    PaymentTransactionId = Guid.NewGuid(),
                    OrderId = customerOrder.OrderId,
                    StripeTransactionId = intent.Id
                };
                _context.PaymentTransactions.Add(transaction);

                await _context.SaveChangesAsync();
                return Ok(customerOrder);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Order>> DeleteOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        // TODO: Add a method to request cancellation of an order.

        #region Helper Methods
        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
        #endregion
    }
}
