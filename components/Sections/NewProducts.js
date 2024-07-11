
import Layout from "../Layout/Layout";
import ProductsGrid from "../Product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center overflow-x-hidden py-[3.5rem]">
      <Layout>
        <div className="flex flex-col gap-[2rem]">
          <h3 className="font-semibold uppercase">Produse noi</h3>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </div>
      </Layout>
    </div>
  );
}