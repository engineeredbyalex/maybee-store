import React from "react";
import ProductBox from "@/components/Product/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-hidden">
      {products?.map((product) => (
        <ProductBox
          key={product._id}
          {...product}
          wished={wishedProducts.includes(product._id)}
        />
      ))}
    </div>
  );
}
