"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import productImage from "../../../lib/assets/images/packing-product-icon.webp";
import "react-toastify/dist/ReactToastify.css";
import { postCart } from "@/app/services/cartServices";

interface IProductDetProps {
  params: { id: string };
}

interface IProduct {
  _id: string;
  productId: number;
  brandName: string;
  productName: string;
  productDescription: string;
  productPrice: number;
}

const ProductDetails: React.FC<IProductDetProps> = ({ params }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const getProducts = async (searchId: number) => {
      try {
        const response = await fetch(
          `/api/products/prodId?${searchId > 0 ? `query=${searchId}` : 0}`
        );
        const resp = await response.json();
        setProducts(resp);
      } catch {
        console.log("err");
      }
    };

    const numericValue: number = Number(params.id);
    if (numericValue > 0) {
      getProducts(numericValue);
    } else {
      getProducts(0);
    }
  }, [params]);

  const addProductToCart = async () => {
    const product = products[0];
    if (product) {
      try {
        const response = await postCart(product);
        const data = await response.json();
        if (data.message === "added to cart") {
          toast("Added to cart successfully", {
            type: "success",
            theme: "dark",
            autoClose: 1000,
          });
        }
      } catch (error) {
        alert(error);
        toast("Please try again later", {
          type: "error",
          theme: "dark",
          autoClose: 1000,
        });
      }
    } else {
      toast("Please try again later", {
        type: "error",
        theme: "dark",
        autoClose: 1000,
      });
    }
  };
  return (
    <main>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-shrink-0">
            <Image
              className="rounded-lg md:w-56"
              width={400}
              height={300}
              src={productImage}
              alt="Product Name"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h1 className="text-xl font-bold text-gray-900">
              {products[0]?.productName}
            </h1>
            <p className="mt-2 text-gray-900">
              {products[0]?.productDescription}
            </p>
            <div className="mt-3">
              <span className="text-gray-900">Price:</span>
              <span className="ml-1 text-gray-900 font-bold">
                €{products[0]?.productPrice}
              </span>
            </div>
            <div className="mt-6">
              <button
                className="px-8 py-2 bg-green-600 text-black text-sm font-medium rounded hover:bg-gray-100"
                onClick={addProductToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ProductDetails;
