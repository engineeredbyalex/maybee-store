import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
import Header from "@/components/Basic/Header";
import HeroComponent from "@/components/Components/HeroComponent";
import NewProducts from "@/components/Components/NewProducts";
import Footer from "@/components/Basic/Footer";
import AboutUs from "@/components/Components/AboutUs";

import { useState } from 'react';
import GeoLocationComponent from './api/GeoLocationComponent';
import DataSenderComponent from './api/DataSenderComponent';

export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationUpdate = (location) => {
    setUserLocation(location);
  };

  return (
    <div>
      <Header />
      <HeroComponent />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
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

