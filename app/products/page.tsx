import React from "react";
import ProductListing from "../components/ProductListing/ProductListing";

export default async function ProductPage() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return <ProductListing productList={products} />;
}
