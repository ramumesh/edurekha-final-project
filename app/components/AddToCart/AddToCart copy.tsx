"use client";
import { postCart } from "@/app/services/cartServices";
import { IProduct } from "@/app/interfaces/IProduct";
import React from "react";
import { toast } from "react-toastify";

export default function AddToCart({ product }: { product: IProduct }) {
  const addProductToCart = async () => {
    if (product) {
      try {
        const response = await postCart(product);
        const data = await response.json();
        if (data.message) {
          //alert("Added to cart successfully");
          toast("Added to cart successfully", {
            type: "success",
            theme: "dark",
            autoClose: 1000,
          });
        }
      } catch (error) {
        alert(error);
        /*toast("Please try again later", {
          type: "error",
          theme: "dark",
          autoClose: 1000,
        });*/
      }
    } else {
      /*toast("Please try again later", {
        type: "error",
        theme: "dark",
        autoClose: 1000,
      });*/
    }
  };
  return (
    <div className="mt-6">
      <button
        className="px-8 py-2 bg-green-600 text-black text-sm font-medium rounded hover:bg-gray-100"
        onClick={addProductToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
