using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductInvoice.Models
{
    public class ProductPrice
    {
        public string ProductNamefromlist { get; set; }
        public string ProductUnitType { get; set; }
        public int ProductQuantity { get; set; }
        public decimal ProductRate { get; set; }
        public decimal DiscountPercentage { get; set; }

    }
}