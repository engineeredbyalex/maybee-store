import Header from "@/components/Basic/Header";
import { useLayoutEffect, useState } from "react";
import Center from "@/components/Layout/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/Layout/ProductsGrid";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import Footer from "@/components/Basic/Footer";
import ScrollButton from "@/components/Basic/ScrollButton";


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
    <>
      <Header />
      <Center>
        <div className="w-full flex items-center justify-start text-5xl mt-[5rem] font-normal text-uppercase mb-5">Toate produsele</div>
      </Center>
      <div className="mt-[10rem]">
        <Center>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </Center>
      </div>
      <ScrollButton />
      <Footer />
    </>
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