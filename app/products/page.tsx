"use client";

import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import productImage from "../../lib/assets/images/packing-product-icon.webp";
import Image from "next/image";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";

export interface Product {
  _id: string;
  productId: number;
  brandName: string;
  productName: string;
  productDescription: string;
  productPrice: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const debounced = useDebouncedCallback(
    () => {
      if (searchText !== "") {
        fetchProducts(searchText);
      } else {
        fetchProducts();
      }
    },
    500,
    { maxWait: 2000 }
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    debounced();
  }, [searchText]);

  async function fetchProducts(query?: string) {
    try {
      const url = query ? `/api/searchText?query=${query}` : "/api/products";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div className="mb-20">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "2%",
        }}
      >
        <Input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style={{ width: "60%" }}
          size="large"
          placeholder="Search Products"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((e) => (
          <div className="flex flex-wrap items-stretch" key={e.productId}>
            <div className="p-4 ">
              <div className="h-full bg-white shadow-sm rounded-md overflow-hidden">
                {/* image */}
                <Link href={`/products/${e.productId}`}>
                  <Image
                    className="object-cover "
                    src={productImage}
                    alt="Image Alt Text"
                    priority={true}
                  />
                </Link>
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900 mb-1">
                    {e.productName}
                  </h2>
                  <h1 className="text-gray-600 ml-auto">{e.brandName}</h1>
                  <div>
                    <span className="text-gray-600 ml-auto">
                      Price : €{e.productPrice}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap ">
                    <a
                      href={`/products/${e.productId}`}
                      className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Buy Now
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
