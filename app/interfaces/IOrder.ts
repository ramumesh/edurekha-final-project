interface Iproducts{
    productName: String,
    quantity: Number,
    price: Number,
}

interface IOrder {
  orderId: Number,
  name: String,
  email: String,
  address: String,
  total: Number,
  products: [Iproducts],  
  date : String,  
}