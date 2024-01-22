import Header from "@/components/Basic/Navigation Bar/Header";
import Center from "@/components/Layout/Center";
import ProductBox from "@/components/Layout/ProductBox";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Category } from "@/models/Category"; // Import Category model
import { Product } from "@/models/Product"; // Import Product model
import Footer from "@/components/Basic/Footer";
import { useLayoutEffect, useState } from "react";
import ScrollButton from "@/components/Basic/ScrollButton";
import Banner from "@/components/Basic/Navigation Bar/Banner";
import Layout from "@/components/Layout/Layout";
import { BigSpacer, SmallSpacer } from "@/components/Layout/Spacer";

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
        <div className="w-full flex items-center justify-start mt-[15rem]">
          <h4 className="uppercase font-bold text-[#595959]">
            Catalog
          </h4>
        </div>
        <SmallSpacer>
          <div className="w-full flex items-center justify-center flex-col">
            {mainCategories.map((cat) => (
              <div key={cat._id} className="mb-8 w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-full flex flex-col">
                    <h5 className=" font-bold text-[#595959]">{cat.name}</h5>
                    <Link href={'/category/' + cat._id}>
                      <p className="text-[#595959]">Arată toate</p>
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
        </SmallSpacer>
      </Layout>
      <ScrollButton />
      <Footer />
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
      { limit: 2, sort: { _id: -1 } }
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
