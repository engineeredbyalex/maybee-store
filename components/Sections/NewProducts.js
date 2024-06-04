
import Layout from "../Layout/Layout";
import ProductsGrid from "../Product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="w-screen min-h-screen mt-[100vh] flex flex-col items-center justify-center">
      <Layout>
        <div className="w-full flex items-start justify-center flex-col mt-[5rem]">
          <h4 className="mb-5">Toate produsele</h4>
        </div>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Layout>
    </div>
  );
}