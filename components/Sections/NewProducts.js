
import Link from "next/link";
import Layout from "../Layout/Layout";
import ProductsGrid from "../Product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center overflow-x-hidden py-[3.5rem] bg-gray-100">
      <Layout>
        <div className="flex flex-col gap-[3.5rem]">
          <div>
            <h3 className="font-semibold uppercase">Produse noi</h3>
            <Link href={'/products/'}>
              <p className="text-[#000]">Vezi mai multe</p>
            </Link>
        </div>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </div>
      </Layout>
    </div>
  );
}