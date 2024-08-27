// importing useLayoutEffect and useState
import { useLayoutEffect, useState } from "react";
// 
import { getServerSession } from "next-auth";
// 
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// 
import { mongooseConnect } from "@/lib/mongoose";
// 
import { Product } from "@/models/Product";
// 
import { WishedProduct } from "@/models/WishedProduct";
// 
import Header from "@/components/basic/Header";
// 
import Banner from "@/components/basic/Banner";
// 
import Landing from "@/components/sections/Landing";
// 
import NewProducts from "@/components/sections/Products";
// 
import OrderProcess from "@/components/sections/Order";
// 
import CategoriesSection from "@/components/sections/Categories";
import Reviews from "@/components/sections/Reviews";


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
      <Reviews/>
      <OrderProcess />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
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
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
