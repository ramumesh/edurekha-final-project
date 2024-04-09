"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CheckoutPage = () => {


  const router = useRouter();
  const [item, setItem] = useState<ICart[]>([]);
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `/api/cart`
        );
        const resp = await response.json();
        // const array : ICart[] = []
        var totalTemp = 0
        resp.map((carttemp: ICart) => {
          // console.log("array ", carttemp);
          totalTemp = totalTemp + carttemp.productPrice;
        })

        setTotal(totalTemp);
        setItem(resp);
        console.log("array ", item);


      } catch {
        console.log("err");
      }
    };



    getProducts();
  }, []);

  async function navigateToOrderPage(e: any) {
    e.preventDefault();
    if (total > 0) {
      const order = {} as IOrder;
      const products = new Array() as [Iproducts]
      item.map((product) => {
        const productItem: Iproducts = {
          productName: product.productName,
          price: product.productPrice, quantity: product.quantity
        }
        products.push(productItem)
      })
      const number = Math.floor(Math.random() * 12500541)
      order.orderId = number;
      order.date = new Date().toLocaleDateString('en-GB');
      console.log("date.................", order.date)
      order.name = name;
      order.address = address;
      order.total = total;
      order.email = email;
      order.products = products;

      try {
        console.log("order creation called", order)
        const response = await fetch(
          `/api/order`, {
          method: "PUT",
          body: JSON.stringify({ order }),
        });

        const resp = await response.json();
        console.log("order confirmed", resp)

        router.push("/orders")
        if (resp.message === "order created") {

          // CartModel.collection.drop();

        }


      } catch {
        console.log("err");
      }
    }


  }



  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 mr-2 bg-white p-5 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="John Doe"
                required
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="you@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Shipping Address</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                placeholder="123 Main St"
                required
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
            </div>
            {/* <!-- Additional fields like city, state, zip, country, etc. --> */}
            {/* <!-- <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"
                >Payment Details</label
              >
              <div className="p-4 bg-gray-100 rounded-lg">
                Payment form elements go here. (Integration with a payment
                gateway is not required)
              </div>
            </div> --> */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit" onClick={(navigateToOrderPage)}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-1/4 ml-2 bg-white p-5 shadow-md">
          <h3 className="text-xl font-bold mb-4">Your Order</h3>
          {/* <!-- Summary of the cart items --> */}
          {item.map((cartItem) => {
            return (<>
              <div className="mb-2">
                <span className="text-gray-600">{cartItem.productName} x {cartItem.quantity}</span>
                <span className="float-right">£{cartItem.productPrice * cartItem.quantity}</span>
              </div>
            </>)
          })}

          {/* <!-- Repeat for each product --> */}
          <div className="border-t mt-4">
            <div className="flex justify-between mt-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">£{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CheckoutPage