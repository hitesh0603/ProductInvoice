using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductInvoice.Models
{
    public class CustomerDetail
    {
        public string Customername { get; set; }
        public string Invoicedate { get; set; }
        public string UpdateInventory { get; set; }
        public string ContactNum { get; set; }
        public string CustomerState { get; set; }
        public string CustomerGST { get; set; }
        public string billingAddress { get; set; }
        public string CustomerComments { get; set; }

        public ProductPriceCalculation PriceCalculation;
    }


}