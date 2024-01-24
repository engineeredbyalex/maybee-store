import Center from "@/components/layout/Center";
import ProductsGrid from "@/components/layout/ProductsGrid";
import { RevealWrapper } from "next-reveal";
import { useEffect } from "react";
import Layout from "../layout/Layout";
import { BigSpacer } from "../layout/Spacer";

export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] py-[60px]">
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