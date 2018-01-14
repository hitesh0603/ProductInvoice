ALTER PROCEDURE SP_PRODUCTDETAIL
@Customername nvarchar(100),
@Invoicedate  nvarchar(50),
@UpdateInventory char,
@ContactNum nvarchar(15),
@CustomerState nvarchar(30),
@CustomerGST nvarchar(50),
@billingAddress nvarchar(256),
@Customercomments nvarchar(1024),

@CustomerId INT,
@ProductName nvarchar(50),
@SaleType nvarchar(50),
@Quantity varchar(50),
@Price FLOAT,
@Discount FLOAT,
@Rate FLOAT,
@PriceAfterTaxes FLOAT,
@SubTotal FLOAT,
@CGST FLOAT,
@SGST FLOAT,
@SubTotalAfterTaxes FLOAT
AS
BEGIN
INSERT INTO CustomerDetail
VALUES(@Customername,@Invoicedate,@UpdateInventory,@ContactNum,@CustomerState,@CustomerGST,@billingAddress,@Customercomments)


INSERT INTO ProductDetail
VALUES(@CustomerId,@ProductName,@SaleType,@Quantity,@Price,@Discount,@Rate,@PriceAfterTaxes,@SubTotal,@CGST,@SGST,@SubTotalAfterTaxes)


END



------------------SP - Insert in to Customer Detail------------

CREATE PROCEDURE SP_CustomerDetail
@Customername nvarchar(100),
@Invoicedate  nvarchar(50),
@UpdateInventory char,
@ContactNum nvarchar(15),
@CustomerState nvarchar(30),
@CustomerGST nvarchar(50),
@billingAddress nvarchar(256),
@Customercomments nvarchar(1024)

AS
SET NOCOUNT ON;
BEGIN
INSERT INTO CustomerDetail
VALUES(@Customername,@Invoicedate,@UpdateInventory,@ContactNum,@CustomerState,@CustomerGST,@billingAddress,@Customercomments)

END

------------------SP - Select from Customer Detail------------

CREATE PROCEDURE SP_ViewCustomerDetail
@Customername nvarchar(100)
AS
SET NOCOUNT ON;
BEGIN
SELECT * FROM CustomerDetail
WHERE Customername = @Customername

END

-------------------Sp for Product-----------------

ALter Procedure SP_ProductList
@ProductNamefromlist nvarchar(1024)

AS
SET NOCOUNT ON;
BEGIN
SELECT ProductNamefromlist,ProductUnitType,ProductQuantity,ProductRate,DiscountPercentage
FROM ProductList
WHERE ProductNamefromlist = @ProductNamefromlist
END