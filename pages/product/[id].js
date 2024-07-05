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
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            <div className="w-full lg:w-1/2 flex justify-center">
              <ProductImages images={product.images} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className=" text-black font-semibold ">{product.title}</h4>
                <h5 className="font-medium text-black">{product.price} RON</h5>
              </div>
              <div className="flex flex-col gap-5">
                {product.properties?.map((property, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h5 className="font-semibold uppercase text-[#000]">{property.name}</h5>
                    <div className="flex flex-wrap gap-3">
                      {property.values?.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          onClick={() => handlePropertyValueChange(property.name, value)}
                          className={`w-full min-h-[3rem] px-3 py-2 flex items-center justify-center text-center rounded-md cursor-pointer transition-colors duration-200 ${selectedValues[property.name] === value ? 'bg-[#7F1515] text-white' : 'bg-[#d3d3d3] text-[#000000]'}`}
                        >
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full mt-4 flex items-center justify-center">
                <FlyingButton
                  main
                  _id={product._id}
                  dynamicProps={dynamicProps}
                  selectedValues={selectedValues}
                  src={product.images?.[0]}
                >
                  <h6 className="text-white font-normal">Adaugă în coș</h6>
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
