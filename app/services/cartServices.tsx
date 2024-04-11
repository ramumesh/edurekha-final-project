import { ICart } from "@/lib/interfaces/ICart";
import { Product } from "../products/page";

const URL = "/api/cart";
export const getCart = async () => {
  return fetch(`${URL}?userId=${sessionStorage.getItem("userId")}`);
};

export const putCart = (product: ICart) => {
  return fetch(URL, {
    method: "PUT",
    body: JSON.stringify({ product: product }),
  });
};

export const postCart = async (product: Product) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      product: { ...product, userId: sessionStorage.getItem("userId") },
    }),
  });
};

export const removeCart = async (productId?: number) => {
  return fetch(URL, {
    method: "DELETE",
    body: JSON.stringify({
      productId,
      userId: sessionStorage.getItem("userId"),
    }),
  });
};
