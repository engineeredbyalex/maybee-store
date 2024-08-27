import Link from "next/link";
import ProductsGrid from "../product/ProductsGrid";

export default function NewProducts({ products, wishedProducts }) {
  return (
    <div className="h-auto w-screen px-5 lg:px-10 py-14 gap-10 lg:gap-14 mt-10 lg:mt-20  flex flex-col items-center justify-center">
      <div className="w-full gap-4 flex flex-col items-start justify-center">
        <h3 className="">Produse noi</h3>
        <div className="w-full gap-4 flex flex-col lg:flex-row justify-between items-center">
          <h5 className="w-full lg:w-3/4">Vezi toată gama noastră de produse</h5>
          <div className="w-full lg:w-1/4 flex lg:justify-end">
            <Link
              className="button_outline transition w-full px-4 py-2 flex items-center justify-center"
              href="/products"
            >
              <h5> Vezi toate produsele</h5>
            </Link>
          </div>
        </div>
      </div>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </div>
  );
}
