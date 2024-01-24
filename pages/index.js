import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
import Header from "@/components/Basic/navigation/Header";
import HeroComponent from "@/components/components/HeroComponent";
import NewProducts from "@/components/components/NewProducts";
import Footer from "@/components/Basic/Footer";
import AboutUs from "@/components/components/AboutUs";
import { useLayoutEffect, useState } from "react";
import ScrollButton from "@/components/Basic/ScrollButton";
import Banner from "@/components/Basic/navigation/Banner";

export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
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
    <div>
      <Banner />
      <Header />
      <HeroComponent />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      <AboutUs />
      <ScrollButton />
      <div className="mt-[30px] lg:mt-[60px]">
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({ name: 'featuredProductId' });
  // const featuredProductId = featuredProductSetting.value;
  // const featuredProduct = await Product.findById(featuredProductId);
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
      // featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
