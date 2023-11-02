import React from "react";
import ProductBox from "@/components/Layout/ProductBox";
import { RevealWrapper } from "next-reveal";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-3">
      {products?.map((product, index) => (
        <ProductBox key={product._id} {...product} wished={wishedProducts.includes(product._id)} />
      ))}
    </div>
  );
}