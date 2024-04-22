"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginImg from "@/app/assets/images/dfimg.jpg";
import { getCart, putCart, removeCart } from "@/app/services/cartServices";
import { ICart } from "@/app/interfaces/ICart";

const CartPage = () => {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState<ICart[]>([]);
  const [total, setTotal] = useState(0);

  const handleChange = (value: string, id: number) => {
    const updatedCartProducts: ICart[] = cartProducts.map((cartItem) => {
      if (cartItem?.productId === id) {
        const updateCartProduct = { ...cartItem, quantity: +value };
        putCart(updateCartProduct).then((res) => {
          console.log(res);
        });
        return updateCartProduct;
      } else {
        return cartItem;
      }
    });
    calculateTotal(updatedCartProducts);
    setCartProducts(updatedCartProducts);
  };
  const calculateTotal = (resp: any) => {
    let totalTemp = 0;
    resp.forEach((carttemp: ICart) => {
      totalTemp = totalTemp + carttemp.productPrice * carttemp.quantity;
    });
    setTotal(totalTemp);
  };
  const getCartProducts = async () => {
    try {
      const response = await getCart();
      const resp = await response.json();
      setCartProducts(resp);
      calculateTotal(resp);
    } catch {
      console.log("err");
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  async function removeCartItem(e: any, productId: any) {
    e.preventDefault();
    try {
      alert(productId);
      const response = await removeCart(productId);
      const resp = await response.json();
      if (resp.message === "deleted") {
      }
      getCartProducts();
    } catch {
      console.log("err");
    }
  }

  const navigateToCheckout = () => {
    // Navigate to '/myroute' when the button is clicked
    if (total > 0) {
      router.push("/checkout");
    }
  };

  return (
    <main>
      <div className="container mx-auto mt-10 mb-20">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cartProducts?.length}</h2>
            </div>

            {cartProducts?.map((cartitem) => {
              return (
                <>
                  <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                      {cartitem?.productName}
                    </h3>
                    <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5">
                      {cartitem?.quantity}
                    </h3>
                    <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5">
                      {cartitem?.productPrice}
                    </h3>
                    <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5">
                      Remove
                    </h3>
                  </div>

                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <Image
                          className="h-24"
                          height={200}
                          width={200}
                          src={loginImg}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm text-gray-900">
                          {cartitem?.productName}
                        </span>
                        <span className="text-red-500 text-xs">
                          {cartitem?.brandName}
                        </span>
                        <a
                          href="#"
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          onClick={(e) => {
                            removeCartItem(e, cartitem?.productId);
                          }}
                        >
                          Remove
                        </a>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      {/* <!-- Adjust Quantity --> */}
                      <input
                        className="mx-2 border text-center w-8 text-gray-900"
                        type="text"
                        value={cartitem?.quantity}
                        onChange={(e) => {
                          handleChange(e.target.value, cartitem?.productId);
                        }}
                      />
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm text-gray-900">
                      €{cartitem?.quantity * cartitem?.productPrice}
                    </span>
                    <div className="flex justify-center w-1/5">
                      <button
                        className="fill-current text-gray-500 w-4"
                        onClick={(e) => {
                          removeCartItem(e, cartitem?.productId);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}

            {/* <!-- Repeat for each cart item --> */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <div className="flex items-center">
                <i className="fa fa-arrow-left text-sm pr-2"></i>
                <a
                  href="/products"
                  className="text-md font-medium text-indigo-500"
                >
                  Continue Shopping
                </a>
              </div>
              <div className="flex justify-center items-end">
                <span className="text-sm font-medium text-gray-900">
                  Subtotal:
                </span>
                <span className="text-lg ml-3 font-bold text-gray-900">
                  €{total}
                </span>
              </div>
              <div className="flex">
                <button
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={navigateToCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
