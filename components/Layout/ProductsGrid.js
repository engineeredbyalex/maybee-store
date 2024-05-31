import React from "react";
import ProductBox from "@/components/Layout/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="w-full h-full gap-[5rem] flex xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-2 flex-col items-center justify-center">
      {products?.map((product, index) => (
        <ProductBox key={product._id}  {...product} wished={wishedProducts.includes(product._id)} />
      ))}
    </div>
  );
}