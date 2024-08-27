import React from "react";
import ProductBox from "@/components/product/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="w-full h-full gap-8 grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
      {products?.slice(0, 8).map((product) => (
        <ProductBox
          key={product._id}
          {...product}
          wished={wishedProducts.includes(product._id)}
        />
      ))}
    </div>
  );
}
