import React from "react";
import ProductCard from "../ProductCard";

const FeaturedProductListing = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductListing;
