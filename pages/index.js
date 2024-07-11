import { useLayoutEffect, useState } from "react";
import Header from "@/components/Basic/Header";
import Banner from "@/components/Basic/Banner";
import Footer from "@/components/Basic/Footer";
import AboutUs from "@/components/Sections/AboutUs";
import Page from "@/components/Layout/Page";
import NewProducts from "@/components/Sections/NewProducts";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
import ScrollButton from "@/components/Basic/ScrollButton";
import Landing from "@/components/Sections/Landing";
import CategoriesPage from "./categories";
import CategoriesSection from "@/components/Sections/CategoriesSection";

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
    <div className="overflow-x-hidden">
      <Banner />
      <Header />
      <Landing />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      <CategoriesSection />
      <AboutUs /> 
      <Footer />
    </div>
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
