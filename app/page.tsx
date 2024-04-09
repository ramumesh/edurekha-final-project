import Image from "next/image";
import Header from "./components/header";
import Banner from "./components/Banner";
import FeaturedProductListing from "./components/FeaturedProduct";
import Link from "next/link";
import ProductsPage from "./products/page";
import HomePage from "./home/page";

export default function Home() {
  return (
    <div>
      {/* <<Link href={"/login"}>Login</Link>> */}
      <HomePage/>
      
    </div>
  );
}
