import { ICart } from "@/app/interfaces/ICart";
import { IProduct } from "@/app/interfaces/IProduct";

const URL = "/api/cart";
export const getCart = async () => {
  return fetch(URL);
};

export const putCart = (product: ICart) => {
  return fetch(URL, {
    method: "PUT",
    body: JSON.stringify({ product: product }),
  });
};

export const postCart = async (product: IProduct) => {
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
