import React from "react";
import Image from "next/image";

const ProductCard = () => {
  return (
    
      <div className="p-4 lg:w-1/4 md:w-1/2">
        <div className="h-full bg-white shadow-sm rounded-md overflow-hidden">
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            height={200}
            width={200}
            src="/product-image-url.jpg"
            alt="product name"
          />

          <div className="p-6">
            <h2 className="text-base font-medium text-indigo-600 mb-1">
              Category
            </h2>
            <h1 className="text-lg font-semibold mb-3">Product Name</h1>
            <p className="leading-relaxed mb-3">
              Short product description. Highlight key features.
            </p>
            <div className="flex items-center flex-wrap ">
              <a
                href="product-detail.html"
                className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <span className="text-gray-600 ml-auto">£Price</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
