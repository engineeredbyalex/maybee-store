import React from "react";
import ProductBox from "@/components/Layout/ProductBox";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="flex flex-col gap-[5rem] md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3">
      {products?.map((product, index) => (
        <ProductBox key={product._id}  {...product} wished={wishedProducts.includes(product._id)} />
      ))}
    </div>
  );
}