
import Layout from "../Layout/Layout";
import ProductsGrid from "../Product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="py-12 w-screen h-auto flex flex-col items-center justify-center overflow-x-hidden">
      <Layout>
        <div className="flex flex-col gap-8">
          <h4 className="font-bold">Produse noi</h4>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </div>
      </Layout>
    </div>
  );
}