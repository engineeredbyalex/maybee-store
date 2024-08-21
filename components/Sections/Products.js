
import Link from "next/link";
import Layout from "../layout/Layout";
import ProductsGrid from "../product/ProductsGrid";
export default function NewProducts({ products, wishedProducts }) {

  return (
    <div className="w-full h-auto flex flex-col items-start justify-center container">
      <div className="gap-2 flex flex-col items-start justify-center">
        <h3 className="w-full">Produse noi</h3>
        <Link className="mb-5" href={'/products/'}>
          <h5 className="">Vezi mai multe</h5>
        </Link>
      </div>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </div >
  );
}