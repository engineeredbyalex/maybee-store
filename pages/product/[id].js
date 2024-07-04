import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Header from "@/components/Basic/Header";
import ProductImages from "@/components/Product/ProductImages";
import FlyingButton from "@/components/Basic/MainButton";
import ProductReviews from "@/components/Reviews/ProductReviews";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import INTRETINERELUMANARI from '@/public/images/instruction_1.svg';
import INTRETINERECEARA from '@/public/images/instruction_2.svg';
import Layout from "@/components/Layout/Layout";
import Container from "@/components/Layout/Container";

export default function ProductPage({ product }) {
  const [selectedValues, setSelectedValues] = useState({});
  const [dynamicProps, setDynamicProps] = useState();

  const handlePropertyValueChange = (name, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [name]: value,
    }));
  };

  return (
    <div className="text-[#000] overflow-x-hidden">
      <Banner />
      <Header />
      <div className="py-20 min-h-screen">
        <Layout>
          <div className="flex flex-col justify-start items-center w-full md:w-1/2">
            <ProductImages images={product.images} />\
            <div className="w-full h-auto flex flex-col">
              <p className="font-medium text-center lg:text-left text-black mb-[1rem]">{product.title}</p>
              <div className="mt-5 w-[100%] flex items-center justify-center gap-2">
                <FlyingButton
                  main
                  _id={product._id}
                  dynamicProps={dynamicProps}
                  selectedValues={selectedValues}
                  src={product.images?.[0]}
                >
                  <p className="uppercase text-white font-medium">Adaugă în coș</p>
                </FlyingButton>
              </div>
            </div>
          </div>
        </Layout>
        </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
