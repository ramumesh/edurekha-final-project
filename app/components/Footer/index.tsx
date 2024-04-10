import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ marginTop: "50px" }}
      className="bg-white shadow fixed bottom-0 left-0 w-full"
    >
      <div className="container mx-auto px-5 py-6">
        <p className="text-gray-500 text-sm text-center">
          © 2024 eCommerce Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
