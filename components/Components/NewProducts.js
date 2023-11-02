import Center from "@/components/Layout/Center";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import { RevealWrapper } from "next-reveal";
import { useEffect } from "react";

export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Center>

          <h2 className="w-full flex text-5xl mt-[5rem] font-normal uppercase mb-5">Produse noi</h2>

      </Center>
      <Center>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
    </div>
  );
}