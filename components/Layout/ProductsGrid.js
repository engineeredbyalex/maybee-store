import React from "react";
import ProductBox from "@/components/Layout/ProductBox";
import { RevealWrapper } from "next-reveal";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-3">
      {products?.map((product, index) => (
        <RevealWrapper key={product._id} delay={index * 50} reset={false}>
          <ProductBox {...product} wished={wishedProducts.includes(product._id)} />
        </RevealWrapper>
      ))}
    </div>
  );
}