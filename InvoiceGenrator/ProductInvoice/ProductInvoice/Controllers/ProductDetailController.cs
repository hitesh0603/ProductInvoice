using Newtonsoft.Json;
using ProductInvoice.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ProductInvoice.Controllers
{
    public class ProductDetailController : Controller
    {

        SqlConnection con = new SqlConnection();
        public void Connection()
        {
            con.ConnectionString = ConfigurationManager.ConnectionStrings["ConnString"].ConnectionString;
            con.Open();
        }

        // GET: ProductDetail
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult CustomerAndProductDetail()
        {
            return View();
        }

        /// <summary>
        /// Add customerdetail and Product detail 
        /// </summary>
        /// <returns></returns>
        public ActionResult ProductInvoiceDetail()
        {
            return View();
        }

        [HttpPost]
        [ActionName("ProductInvoiceDetail")]
        public ActionResult ProductInvoiceDetail(CustomerDetail custDetail)
        {
            Connection();

            SqlCommand cmd = new SqlCommand("SP_CustomerDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            Session["Customername"] = custDetail.Customername;
            cmd.Parameters.AddWithValue("@Customername", custDetail.Customername);
            cmd.Parameters.AddWithValue("@Invoicedate", custDetail.Invoicedate);
            cmd.Parameters.AddWithValue("@UpdateInventory", custDetail.UpdateInventory = custDetail.UpdateInventory == null ? " " : custDetail.UpdateInventory);
            cmd.Parameters.AddWithValue("@ContactNum", custDetail.ContactNum = custDetail.ContactNum == null ? " " : custDetail.ContactNum);
            cmd.Parameters.AddWithValue("@CustomerState", custDetail.CustomerState = custDetail.CustomerState == "-1" ? " " : custDetail.CustomerState);
            cmd.Parameters.AddWithValue("@CustomerGST", custDetail.CustomerGST = custDetail.CustomerGST == null ? " " : custDetail.CustomerGST);
            cmd.Parameters.AddWithValue("@billingAddress", custDetail.billingAddress = custDetail.billingAddress == null ? " " : custDetail.billingAddress);
            cmd.Parameters.AddWithValue("@Customercomments", custDetail.CustomerComments = custDetail.CustomerComments == null ? " " : custDetail.CustomerComments);
            cmd.ExecuteNonQuery();
            con.Close();
            return RedirectToAction("Viewsalesinvoicedetail", "ProductDetail");
        }


        /// <summary>
        /// Fetch the product detail and price
        /// </summary>
        /// <param name="productprice"></param>
        /// <returns></returns>
        [HttpPost]
        public string ProductPriceDetail(ProductPrice productprice)
        {

            Connection();
            string jsonConvert = null;
            List<ProductPrice> userlist = new List<ProductPrice>();
            SqlCommand cmd = new SqlCommand("SP_ProductList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProductNamefromlist", productprice.ProductNamefromlist);

            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                ProductPrice productprice1 = new ProductPrice
                {
                    ProductNamefromlist = Convert.ToString(reader["ProductNamefromlist"]),
                    ProductQuantity = Convert.ToInt32(reader["ProductQuantity"]),
                    ProductRate = Convert.ToDecimal(reader["ProductRate"]),
                    ProductUnitType = Convert.ToString(reader["ProductUnitType"]),
                    DiscountPercentage = Convert.ToDecimal(reader["DiscountPercentage"]),
                };
                jsonConvert = JsonConvert.SerializeObject(productprice1);
            }

            con.Close();
            return jsonConvert;

        }


        public ActionResult Viewsalesinvoicedetail()
        {
            //CustomerDetail(Convert.ToString(Session["Customername"]));
            return View();
        }

        [HttpPost]
        public string CustomerDetail(string customername)
        {
            Connection();
            string jsonConvert = null;
            SqlCommand cmd = new SqlCommand("SP_ViewCustomerDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Customername", Convert.ToString(Session["Customername"]));
            SqlDataReader reader = cmd.ExecuteReader();
            while(reader.Read())
            {
                CustomerDetail customerdetail = new CustomerDetail
                {
                    Customername = Convert.ToString(reader["Customername"]),
                    Invoicedate = Convert.ToString(reader["Invoicedate"]),
                    UpdateInventory = Convert.ToString(reader["UpdateInventory"]),
                    ContactNum = Convert.ToString(reader["ContactNum"]),
                    CustomerState = Convert.ToString(reader["CustomerState"]),
                    CustomerGST = Convert.ToString(reader["CustomerGST"]),
                    billingAddress = Convert.ToString(reader["billingAddress"]),
                    CustomerComments = Convert.ToString(reader["Customercomments"]),
                };
                jsonConvert = JsonConvert.SerializeObject(customerdetail);
            }
            return jsonConvert;
        }
    }
}