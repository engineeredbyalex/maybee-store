import Center from "@/components/Layout/Center";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import { RevealWrapper } from "next-reveal";

export default function NewProducts({ products, wishedProducts }) {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Center>
        <RevealWrapper>
          <h2 className="w-full flex text-5xl mt-[5rem] font-normal uppercase mb-5">Produse noi</h2>
        </RevealWrapper>
      </Center>
      <Center>
        <RevealWrapper>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </RevealWrapper>
      </Center>
    </div>
  );
}