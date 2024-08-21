import React from "react";
import ProductBox from "@/components/product/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-hidden">
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
