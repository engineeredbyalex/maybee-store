// importing useLayoutEffect useState
import { useLayoutEffect, useState } from "react";
// importing WishedProduct
import Header from "@/components/Basic/Header";
// importing WishedProduct
import Banner from "@/components/Basic/Banner";
// importing WishedProduct
import Footer from "@/components/Basic/Footer";
// importing WishedProduct
import AboutUs from "@/components/Sections/AboutUs";
// importing Page
import Page from "@/components/Layout/Page";
// importing NewProducts
import NewProducts from "@/components/Sections/NewProducts";
// importing Product model
import { Product } from "@/models/Product";
// importing mongooseConnect
import { mongooseConnect } from "@/lib/mongoose";
// importing WishedProduct
import { WishedProduct } from "@/models/WishedProduct";
// importing WishedProduct
import { getServerSession } from "next-auth";
// importing WishedProduct
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// importing WishedProduct
import { Setting } from "@/models/Setting";
// importing scroll button
import ScrollButton from "@/components/Basic/ScrollButton";

export default function HomePage({ newProducts, wishedNewProducts }) {
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
      <Page>
        <h1 className="text-[#fff] text-center mt-[10rem] uppercase font-bold absolute top-[25%]">
          Lumanari parfumate <br /> create cu grija si atentie
        </h1>
        <div className="hero_background" />
        <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      </Page>
      <AboutUs />
      <ScrollButton/>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({ name: 'featuredProductId' });
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session.user.email,
      product: newProducts.map(p => p._id.toString()),
    })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
