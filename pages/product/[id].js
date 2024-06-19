// import react useState useEffext
import React, { useState, useEffect } from "react";
// import Header
import Header from "@/components/Basic/Header";
// import
import { mongooseConnect } from "@/lib/mongoose";
// import
import { Product } from "@/models/Product";
// import
import Image from "next/image";
// import
import ProductImages from "@/components/Product/ProductImages";
// import
import FlyingButton from "@/components/Basic/MainButton";
// import
import ProductReviews from "@/components/Reviews/ProductReviews";
// import
import Footer from "@/components/Basic/Footer";
// import
import Banner from "@/components/Basic/Banner";
// import
import INTRETINERELUMANARI from '@/public/images/instruction_1.svg';
// import
import INTRETINERECEARA from '@/public/images/instruction_2.svg';
// import
import Layout from "@/components/Layout/Layout";


import Page from "@/components/Layout/Page";
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
    <div className=" text-[#000] overflow-x-hidden">
      <Banner />
      <Header />
      <Page>
        <Container>
          <div className="w-full flex flex-col lg:flex-row gap-10 p-5  ">
            {/* Product Images */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2">
              <ProductImages images={product.images} />
            </div>
            {/* Product Description */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <h4 className="text-2xl font-bold uppercase text-gray-900">{product.title}</h4>
              {product.weight && (
                <p className="text-[#000]">Gramaj ceară: {product.weight} gr</p>
              )}
              <h5 className="text-2xl font-semibold text-[#000]">{product.price} RON</h5>
              {/* Product settings */}
              <div className="flex flex-col gap-5">
                {product.properties?.map((property, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <h5 className="text-lg font-bold uppercase text-[#000]">{property.name}</h5>
                    <div className="flex flex-wrap gap-3">
                      {property.values?.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          onClick={() => handlePropertyValueChange(property.name, value)}
                          className={`px-3 py-2 w-full text-center rounded-md cursor-pointer transition-colors duration-200 ${selectedValues[property.name] === value ? 'bg-[#7F1515] text-white' : 'bg-[#d3d3d3] text-[#000000]'}`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
        </Container>
        <Container>
          <div className="flex items-center justify-center overflow-hidden">
              <div className="w-full flex flex-col items-center justify-center text-center mb-5">
                {product?.scent && Object.entries(product.scent).map(([scentName, scentDescription]) => (
                  <div className="w-1/2" key={scentName}>
                    <h3 className="text-[#000]">{scentName}</h3>
                    <p className="text-[#000]">{scentDescription}</p>
                  </div>
                ))}
              </div>
            </div>
        </Container>
        <Container>
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <h5>Descrierea produsului</h5>
            <p className="text-[#000]  mb-5 w-3/4 text-center">{product.description}</p>
      </div>
        </Container>
        <div>
            <div className="gap-5 flex flex-col items-center justify-center">
              <h5 className="text-[#000] font-bold uppercase">Detalii despre întreţinere</h5>
              <div className="flex items-center justify-center gap-[5rem] flex-col lg:gap-[5rem] ">
                <INTRETINERELUMANARI className="w-[100%] lg:w-[40rem] " />
                <INTRETINERECEARA className="w-[100%] lg:w-[40rem] " />
              </div>
            </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-2/4">
          <ProductReviews product={product} />
        </div>
      </Page>
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
