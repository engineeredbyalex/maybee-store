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
            <ProductImages images={product.images} />
            <div className="w-full h-auto gap-4 mt-4 flex flex-col">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-left text-black">{product.title}</p>
                <p className="font-medium text-left text-black">{product.price} RON</p>
              </div>
              <div className="flex flex-row gap-5">
                {product.properties?.map((property, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h5 className="text-lg font-bold uppercase text-[#000]">{property.name}</h5>
                    <div className="flex flex-wrap gap-3">
                      {property.values?.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          onClick={() => handlePropertyValueChange(property.name, value)}
                          className={`px-3 py-2 w-auto text-center rounded-md cursor-pointer transition-colors duration-200 ${selectedValues[property.name] === value ? 'bg-[#7F1515] text-white' : 'bg-[#d3d3d3] text-[#000000]'}`}
                        >
                          <p className="text-sm">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-[100%] mt-4 flex items-center justify-center">
                <FlyingButton
                  main
                  _id={product._id}
                  dynamicProps={dynamicProps}
                  selectedValues={selectedValues}
                  src={product.images?.[0]}
                >
                  <h6 className=" text-white font-normal">Adaugă în coș</h6>
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
