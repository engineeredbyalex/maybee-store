import React from "react";
import ProductBox from "@/components/product/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-x-hidden">
      {products?.slice(0, 4).map((product) => (
        <ProductBox
          key={product._id}
          {...product}
          wished={wishedProducts.includes(product._id)}
        />
      ))}
    </div>
  );
}
