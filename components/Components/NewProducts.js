import Center from "@/components/Layout/Center";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import { RevealWrapper } from "next-reveal";
import { useEffect } from "react";
import Layout from "../Layout/Layout";
import { BigSpacer } from "../Layout/Spacer";

export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="py-[60px] min-h-screen flex items-center justify-center">
      <Layout>
        <div className="flex flex-col">
          <BigSpacer>
            <h3 className="text-center text-[#595959] font-bold uppercase">Produse noi</h3>
          </BigSpacer>
          <BigSpacer>
            <ProductsGrid products={products} wishedProducts={wishedProducts} />
          </BigSpacer>
        </div>
      </Layout>
    </div>
  );
}