import Header from "@/components/Basic/Header";
import { useLayoutEffect, useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/Product/ProductsGrid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import Footer from "@/components/Basic/Footer";
import ScrollButton from "@/components/Basic/ScrollButton";
import Banner from "@/components/Basic/Banner";
import Layout from "@/components/Layout/Layout";
import { BigSpacer, SmallSpacer } from "@/components/Layout/Spacer";


export default function ProductsPage({ products, wishedProducts }) {
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
    <div className="overflow-hidden">
      <Banner />
      <Header />
      <Layout>
        <div className="w-full flex items-start justify-center flex-col mt-[5rem]">
          <h4 className="mb-5">Toate produsele</h4>
          <SmallSpacer>
            <ProductsGrid products={products} wishedProducts={wishedProducts} />
          </SmallSpacer>
        </div>
      </Layout>
      <ScrollButton />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session?.user.email,
      product: products.map(p => p._id.toString()),
    })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    }
  };
}