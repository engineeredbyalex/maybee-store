import Header from "@/components/Basic/Header";
import ProductBox from "@/components/Product/ProductBox";
import Link from "next/link";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Category } from "@/models/Category"; // Import Category model
import { Product } from "@/models/Product"; // Import Product model
import Footer from "@/components/Basic/Footer";
import { useLayoutEffect } from "react";
import ScrollButton from "@/components/Basic/ScrollButton";
import Layout from "@/components/Layout/Layout";
import { SmallSpacer } from "@/components/Layout/Spacer";
import Banner from "@/components/Basic/Banner";

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts = [] }) {
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      localStorage.setItem("scrollPosition", scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    // Set the scroll position on component mount
    const storedScrollPosition = localStorage.getItem("scrollPosition");
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Banner />
      <Header />
      <Layout>
          <div className="w-full flex items-start justify-center flex-col mt-[5rem]">
            <h4 className="mb-5">Catalog</h4>
            {mainCategories.map((cat) => (
              <div key={cat._id} className="mb-8 w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-full flex flex-col">
                    <h5 className=" font-bold text-[#000]">{cat.name}</h5>
                    <Link href={'/category/' + cat._id}>
                      <p className="text-[#000]">Arată toate</p>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-[50px] flex-col lg:flex-row">
                  {categoriesProducts[cat._id].map((p, index) => (
                    <ProductBox key={p._id} {...p} wished={wishedProducts.includes(p._id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
      </Layout>
      <ScrollButton />
      <div >
        <Footer />
      </div>
    </ >
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find(
      { category: categoriesIds },
      null,
      { limit: 3, sort: { _id: -1 } }
    );
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session?.user.email,
      product: allFetchedProductsId,
    })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
