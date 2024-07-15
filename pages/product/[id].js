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
          <div className="flex items-start flex-col lg:flex-row gap-10 w-full">
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <ProductImages images={product.images} />
              <p className="font-normal text-black mt-5 hidden lg:flex">{product.description}</p>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="flex flex-col gap-2">
                <h4 className=" text-black font-semibold ">{product.title}</h4>
                <h5 className="font-medium text-black">{product.price} RON</h5>
                <div>
                  <h5 className="font-normal text-black">{product.weight} grame</h5>
                  <h5 className="font-normal text-black">Timp de ardere :{product.weight}</h5>
                </div>

              </div>
              <div className="flex flex-col gap-5">
                {product.properties?.map((property, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h5 className="font-semibold uppese text-[#000]">{property.name}</h5>
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
              <p className="font-normal text-black mt-5 lg:hidden">{product.description}</p>
            </div>
          </div>
          {product.scent ?
            (<Container>
              <div className="mt-[3.5rem] flex items-center justify-center overflow-hidden">
                <div className="w-full flex flex-col items-center justify-center text-center mb-5 lg:grid grid-cols-2">
                  {product?.scent && Object.entries(product.scent).map(([scentName, scentDescription]) => (
                    <div className="w-1/2 lg:w-full" key={scentName}>
                      <h3 className="text-[#000]">{scentName}</h3>
                      <p className="text-[#000]">{scentDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>)
            :
            ("")
          }
          <div className="mt-16">
            <div className="gap-5 flex flex-col items-start justify-center">
              <h4 className="text-[#000] font-normal  text-left">Detalii despre întreţinere</h4>
              <div className="w-full flex items-center justify-between gap-[5rem] flex-col lg:flex-row lg:gap-[5rem] ">
                <INTRETINERELUMANARI className="w-[100%] lg:w-[40rem] " />
                <INTRETINERECEARA className="w-[100%] lg:w-[40rem] " />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center ">
            <ProductReviews product={product} />
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
