import React, { useState, useEffect } from "react";
import Header from "@/components/Basic/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Image from "next/image";
import ProductImages from "@/components/Basic/ProductImages";
import FlyingButton from "@/components/Basic/MainButton";
import ProductReviews from "@/components/Reviews/ProductReviews";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import StickerOne from '@/public/images/caution_1.png';
import StickerTwo from '@/public/images/caution_2.png';

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
    <>
      <Banner />
      <Header />
      <div className="flex items-center justify-center w-full flex-col mt-[10rem] min-h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="w-full flex flex-col items-center justify-center gap-[50px] lg:flex-row  lg:items-start ">
            <div className="max-w-[20rem]">
              <ProductImages images={product.images} />
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-center text-center">
              <h1 className="text-2xl md:text-3xl mb-5">{product.title}</h1>
              <p>{product.description}</p>
              {product.weight ? (
                <p className="text-[18px]">Gramaj ceară: {product.weight} gr</p>
              ) : null}
              {product.properties?.map((property, index) => (
                <div key={index} className="mb-2">
                  <div onClick={() => handlePropertyValueChange(property.name, selectedValues[property.name])}>
                    {property.name}
                  </div>
                  <div className=" flex flex-col lg:grid grid-cols-3 gap-3">
                    {property.values?.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        onClick={() => handlePropertyValueChange(property.name, value)}
                        className={`px-3 py-2 rounded-md text-white cursor-pointer w-[10rem] ${selectedValues[property.name] === value
                          ? 'bg-blue-500'
                          : 'bg-slate-300'
                          }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mb-4 w-full flex items-center justify-center  gap-4">
                <FlyingButton
                  main
                  _id={product._id}
                  dynamicProps={dynamicProps}
                  selectedValues={selectedValues}
                  src={product.images?.[0]}
                >
                  Adaugă în coș
                </FlyingButton>
                <span className="text-2xl ">{product.price} RON</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="scent-info">
            {product.scente?.map((scent, index) => (
              <ScentCard key={index} name={scent.name} description={scent.description} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center gap-8 flex-col lg:gap-[10rem] ">
            <Image
              src={StickerOne}
              alt="Sticker One"
              className="w-[350px] h-[150px] lg:scale-150"
            />
            <Image
              src={StickerTwo}
              alt="Sticker Two"
              className="w-[350px] h-[150px] lg:scale-150"
            />
          </div>
        </div>
        <ProductReviews product={product} />
      </div>
      <Footer />
    </>
  );
}

function ScentCard({ name, description }) {
  return (
    <div className="scent-card mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{description}</p>
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
