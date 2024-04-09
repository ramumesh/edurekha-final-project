"use client";

import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useAppDispatch } from "../../lib/hooks/redux";
import loginImg from "../../lib/assets/images/dfimg.jpg";
import Image from "next/image";

interface Product {
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
  const [totalItems, setTotalItem] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState([]);

  const dispatch = useAppDispatch();

  //   async function fetchProducts() {
  //     try {
  //       const res = await fetch("/api/products");
  //       // if (!res.ok) {
  //       //   throw new Error("Failed to fetch products");
  //       // }
  //       const data = await res.json();
  //       setProducts(data);
  //       setItems(data);
  //       dispatch(productItems(data));
  //       setTotalItem(data.length);
  //       let tTotal = data.length;
  //       setTotalPages(Math.ceil(tTotal / 50));
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       // Handle error appropriately, e.g., set an error state
  //     }
  //   }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText !== "") {
        fetchProducts(searchText);
      } else {
        fetchProducts();
      }
    }, 200); // Adjust the delay as per your requirement
    return () => clearTimeout(delayDebounceFn);
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
      setItems(data);
      // dispatch(productItems(data));
      setTotalItem(data.length);
      let tTotal = data.length;
      setTotalPages(Math.ceil(tTotal / 50));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div>
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
      <div className="grid grid-cols-4">
        {products.map((e) => (
          <div className="my-8" key={e.productId}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 ">
                  <div className="h-full bg-white shadow-sm rounded-md overflow-hidden">
                    {/* image */}
                    <Image
                      className="object-cover "
                      src={loginImg}
                      alt="Image Alt Text"
                      priority={true}
                    />
                    <div className="p-6">
                      <h2 className="text-base font-medium text-indigo-600 mb-1">
                        {e.productName}
                      </h2>
                      <h1 className="text-gray-600 ml-auto">{e.brandName}</h1>
                      {/* <p className="text-gray-600 ml-auto">
                        {e.productDescription}
                      </p> */}
                      <div className="flex items-center flex-wrap ">
                        <a
                          href={`/products/${e.productId}`}
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
                      </div>
                      <div>
                        <span className="text-gray-600 ml-auto">
                          Price : £{e.productPrice}
                        </span>
                      </div>
                    </div>
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