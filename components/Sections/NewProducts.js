
import Layout from "../Layout/Layout";
import ProductsGrid from "../Product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="py-12 w-screen h-auto flex flex-col items-center justify-center overflow-x-hidden">
      <Layout>
        <div className="flex flex-col gap-8">
          <h2 className="font-semibold uppercase">Produse noi</h2>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </div>
      </Layout>
    </div>
  );
}