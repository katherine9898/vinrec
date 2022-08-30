using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class VinylRecord {
  public Guid VinylRecordId { get; set; }
  public string Title { get; set; } = string.Empty;
  public string Artist { get; set; } = string.Empty;
  public string Genre { get; set; } = string.Empty;
  public string Format { get; set; } = string.Empty;
  public double OriginalPrice { get; set; }
  public double CurrentPrice { get; set; }
  public bool OnSale {get; set;} = false;
  public int SalePercent { get; set; } = 0;
  public string Condition { get; set; } = string.Empty;
  public string Label { get; set; } = string.Empty;
  public int Quantity { get; set; } = 0;
  public string Origin { get; set; } = string.Empty;
  public string UPC { get; set; } = string.Empty;

  [DataType(DataType.Date)]
  [Column(TypeName = "Date")]
  public DateTime ReleaseDate { get; set; }
  public string ImageUrl { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Status { get; set; } = string.Empty;
}