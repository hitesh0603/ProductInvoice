using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductInvoice.Models
{
    public class ProductPriceCalculation
    {


        public string ProductName { get; set; }
        public string SaleType { get; set; }
        public string Quantity { get; set; }
        public decimal Price { get; set; }
        public int CustomerId { get; set; }
        public decimal Discount { get; set; }
        public decimal Rate { get; set; }
        public decimal PriceAfterTaxes { get; set; }
        public decimal SubTotal { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal SubTotalAfterTaxes { get; set; }
    }
}