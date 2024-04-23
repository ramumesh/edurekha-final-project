"use client";
import { IProduct } from "@/app/interfaces/IProduct";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { addToCart } from "@/app/actions/action";

export default function AddToCart({ product }: { product: IProduct }) {
  const [state, formAction] = useFormState(addToCart, {
    product,
    message: "",
    messageId: "",
  });
  useEffect(() => {
    if (state.messageId) {
      toast(state.message, {
        type: "success",
        theme: "dark",
        autoClose: 1000,
      });
    }
  }, [state.messageId]);
  return (
    <div className="mt-6">
      <form action={formAction}>
        <button
          type="submit"
          className="px-8 py-2 bg-green-600 text-black text-sm font-medium rounded hover:bg-gray-100"
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}
