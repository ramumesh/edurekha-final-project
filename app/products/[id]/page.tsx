import Image from "next/image";
import productImage from "../../../lib/assets/images/packing-product-icon.webp";
import "react-toastify/dist/ReactToastify.css";
import AddToCart from "@/app/components/AddToCart/AddToCart";
import { ToastContainer } from "react-toastify";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/products/${params.id}`,
    { next: { tags: ["product"] } }
  );
  const products = await response.json();
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
              <AddToCart product={products[0]} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export async function generateStaticParams() {
  const products = await fetch("http://localhost:3000/api/products").then(
    (res) => res.json()
  );
  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default ProductDetails;
