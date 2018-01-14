$(document).ready(function () {
    var ValuesOfRow = "";
    var PriceAfterTaxes, rate, SubTotal, CGST, SGST, TaxDetails, SubTotalAfterTaxes, discount;
    function getColumnTotal(selector) {
        return Array.from($(selector)).reduce(sumReducer, 0);
    }
    function sumReducer(total, cell) {
        return total += parseFloat(cell.innerHTML, 10);
    }

    function fetchCustomerDetail() {
        $.ajax({
            url: "/ProductDetail/CustomerDetail",
            type: "POST",
            dataType: "json",
            data: {
                ProductNamefromlist: $("#Productlist").val()
            },
            success: function (data) {
                if (data !== null || data !== "") {
                    $(".ViewInventoryUpdated").text(data.UpdateInventory);
                    $(".ViewCustomerName").text(data.Customername);
                    $(".ViewInvoiceDate").text(data.Invoicedate);
                    $(".ViewContactNumber").text(data.ContactNum);
                    $(".ViewState").text(data.CustomerState);
                    $(".labelGSTNo").text(data.CustomerGST);
                    $(".ViewBillingAddress").text(data.billingAddress);
                    $(".ViewComments").text(data.CustomerComments);
                    $(".ViewNameAndDate").text();
                }
            }
        });
    }

    function claculatePriceandtax() {
        debugger;
        var totalAmount = getColumnTotal('.ProductPrice').toFixed(2)
        var totalDisCount = getColumnTotal('.DiscountOnProduct').toFixed(2)
        var totalPrice = getColumnTotal('.colSubTotal').toFixed(2);
        var totalQuantity = getColumnTotal('.Quantityval').toFixed(2);
        var totalCGST = getColumnTotal('.CGSTVal').toFixed(2);
        var totalSGST = getColumnTotal('.SGSTVal').toFixed(2);
        var totalSubTotalAfterTaxes = getColumnTotal('.SubTotalAfterTaxesval').toFixed(2);
        $(".ProductSubTotal").text(totalPrice);
        $(".ProductQuantity").text(totalQuantity + "KG");
        $(".ProductCGST").text(totalCGST);
        $(".ProductSGST").text(totalSGST);
        $(".ProductSubTotalAfterTaxes").text(totalSubTotalAfterTaxes);
        $(".TotalAmount").text(totalAmount);
        $(".TotalDiscountonItems").text(totalDisCount);
        $(".TotalNetAmount").text(totalSubTotalAfterTaxes);
        $(".RoundoffAmount").text((Math.round(totalSubTotalAfterTaxes) - totalSubTotalAfterTaxes).toFixed(2));
        $(".TotalAmountPayable").text(Math.round(totalSubTotalAfterTaxes));
    }

    var currentdate = new Date();
    $(".txtInvoiceDate").text(currentdate.getDate() + "/" + currentdate.getMonth() + 1 + "/" + currentdate.getFullYear());

    $(window).load(function () {
        if ($(".lblCustomerName").length <= 0)
        {
            sessionStorage.clear("ProductTablerow"); JX28V - JHWT3 - CJGTK - KXDJB - HRQ73
        }
        
        if ($(".lblCustomerName").length > 0) {
            fetchCustomerDetail();
            $("table thead").append(sessionStorage.getItem("ProductTablerow"));
            claculatePriceandtax();
        }


        $(".UpdateInventorylink").click(function () {
            
            if ($(".lblUpdateInventory").text() === "YES")
            {
                $(".lblUpdateInventory").text("NO");
            }
            else
            {
                $(".lblUpdateInventory").text("YES") 
            }
            window.location.reload();
        })
        $("#Productlist").change(function (e) {
            $.ajax({
                url: "/ProductDetail/ProductPriceDetail",
                type: "POST",
                dataType: "json",
                data: {
                    ProductNamefromlist: $("#Productlist").val()
                },
                success: function (data) {
                    if (data !== null || data !== "") {
                        $(".Popupcontent").css("display", "block");
                        $(".ProductNameVal").text(data.ProductNamefromlist);
                        $(".UnitTypeVal").attr("value", data.ProductUnitType);
                        $(".QuantityVal").attr("value", data.ProductQuantity);
                        $(".RateVal").text(data.ProductRate);
                        $(".DiscountPercentageVal").attr("value", data.DiscountPercentage);
                        $("#Productlist").val(-1);
                    }
                }
            });
        });

        $(".btnCancel").click(function () {
            $(".Popupcontent").css("display", "none");
            $("#Productlist").val(-1);
        });

        $(".btnUpdate").click(function () {


            discount = ($(".RateVal").text() * $(".DiscountPercentageVal").val()) / 100;
            rate = $(".RateVal").text() - discount;
            PriceAfterTaxes = ($(".RateVal").text() - discount).toFixed(2);
            SubTotal = (PriceAfterTaxes * $(".QuantityVal").val()).toFixed(2);
            CGST = (SubTotal * 0.06).toFixed(2);
            SGST = (SubTotal * 0.06).toFixed(2);
            SubTotalAfterTaxes = SubTotal;
            var ProductRow = "<tr><td></td><td class=" + "AddProductName" + ">" + $(".ProductNameVal").text() + "</td><td>" + "Whole Sale" + "</td><td class = " + "Quantityval" + ">" + $(".QuantityVal").val() + "" + $(".UnitTypeVal").val() + "</td><td class=" + "ProductPrice" + ">" + $(".RateVal").text() + "</td><td class=" + "DiscountOnProduct" + ">" + discount.toFixed(2) + "(" + $(".DiscountPercentageVal").val() + "%)</td><td>" + rate.toFixed(2) + "</td> <td>" + PriceAfterTaxes + "</td> <td class=" + " colSubTotal>" + SubTotal + "</td> <td class=" + " CGSTVal" + "> " + CGST + "</td > <td class=" + " SGSTVal" + "> " + SGST + "</td > <td><img class=" + "TaxDetailsimag " + " src=" + "../wwwroot/Images/details.png" + " /></td> <td class=" + " SubTotalAfterTaxesval" + "> " + SubTotalAfterTaxes + "</td > <td class=" + "ActionOnProduct" + " >" + "<div class=" + "UpdateAndDelete" + "><a class=" + "updatedetail" + ">update</a>|| <a class=" + " Deletedetail" + " > Delete</a > </div>" + "</td ></tr > ";
            ValuesOfRow = ValuesOfRow + ProductRow;
            sessionStorage.setItem("ProductTablerow", ValuesOfRow)
            $(".Popupcontent").css("display", "none");

            $("table thead").append(ProductRow);
            $("#Productlist").val(-1)

            claculatePriceandtax();


        });

        $(".btncreateinvoice").click(function () {
            if ($(".txtCustomerName").val() === "") {
                alert("Please Enter name");
            }
            else if ($('.Producttable tr').length < 3) {
                alert("Please select product from list");
            }
            else {
                $.ajax({
                    url: "/ProductDetail/ProductInvoiceDetail",
                    type: "POST",
                    data: {
                        Customername: $(".txtCustomerName").val(),
                        Invoicedate: $(".txtInvoiceDate").text(),
                        UpdateInventory: $(".lblUpdateInventory").text(),
                        ContactNum: $(".txtContactNumber").val(),
                        CustomerState: $(".txtState").val(),
                        CustomerGST: $(".txtGSTNo").val(),
                        billingAddress: $(".txtBillingAddress").val(),
                        CustomerComments: $(".txtComments").val(),

                    },
                    success: function (data) {
                        window.location.href = "/ProductDetail/Viewsalesinvoicedetail"
                    }

                });
            }
        });
    });
});


