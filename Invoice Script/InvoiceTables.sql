Create table CustomerDetail
(
CustomerId INT IDENTITY(1,1) PRIMARY KEY, 
Customername nvarchar(100) not null,
Invoicedate  nvarchar(50) not null,
UpdateInventory nvarchar(30),
ContactNum nvarchar(15),
CustomerState nvarchar(30),
CustomerGST nvarchar(50),
billingAddress nvarchar(256),
Customercomments nvarchar(1024)
)



select * from CustomerDetail


select * from ProductDetail

Create table ProductDetail
(
ProductID INT IDENTITY(1,1) Primary Key,
CustomerId INT,
ProductName nvarchar(50),
SaleType nvarchar(50),
Quantity varchar(50),
Price decimal,
Discount decimal,
Rate decimal,
PriceAfterTaxes decimal,
SubTotal decimal,
CGST decimal,
SGST decimal,
SubTotalAfterTaxes decimal,
FOREIGN KEY (CustomerId) REFERENCES CustomerDetail(CustomerId)
)


Create table ProductList
(
ProductNamefromlist nvarchar(1024),
ProductUnitType nvarchar(256),
ProductQuantity int,
ProductRate FLOAT,
DiscountPercentage FLOAT
)

select * from ProductList

--update ProductList
--set DiscountPercentage = 10.71
--where ProductNamefromlist = 'act 11 nachoz salt 150g'

--insert into ProductList Values ('act ii cheese and herbs b1g1','Kg',1,35.00,10.71)
