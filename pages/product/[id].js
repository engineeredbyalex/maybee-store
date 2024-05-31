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
import ProductImages from "@/components/Basic/ProductImages";
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
// import
import { BigSpacer, SmallSpacer } from "@/components/Layout/Spacer";

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
      <Banner/>
      <Header />
      <div className="flex items-center justify-center w-full flex-col  min-h-[100vh] bg-[#FDFCEA] mt-[5vh]">
        <Layout>
          <div className="flex flex-col items-center justify-between w-full min-h-screen ">
            <div className="flex flex-row items-center justify-between mt-[5rem]">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                <div className="w-full lg:w-1/2 flex items-center justify-center flex-col">
                  <ProductImages images={product.images} />
                </div>
                <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center text-center">
                  <h5 className="font-bold uppercase leading-[2rem] text-[#595959]">{product.title}</h5>
                  <SmallSpacer>
                    <p className="text-[#595959] leading-[2rem] mb-5">{product.description}</p>
                  </SmallSpacer>
                  {product.weight ? (
                    <p className="text-[#595959]">Gramaj ceară: {product.weight} gr</p>
                  ) : null}
                  {product.properties?.map((property, index) => (
                    <div key={index} className="mb-2">
                      <SmallSpacer>
                        <div onClick={() => handlePropertyValueChange(property.name, selectedValues[property.name])}>
                          <h5 className="text-[#595959] font-bold uppercase">   {property.name}</h5>
                        </div>
                      </SmallSpacer>
                      <SmallSpacer>
                        <div className="flex flex-col lg:grid grid-cols-2 gap-3">
                          {property.values?.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              onClick={() => handlePropertyValueChange(property.name, value)}
                              className={`lg:w-[10rem] w-auto flex items-center justify-center px-3 py-2 rounded-md  cursor-pointer ${selectedValues[property.name] === value
                                ? 'bg-[#595959] text-white'
                                : 'bg-slate-300 text-[#595959]'
                                }`}
                            >
                              {value}
                            </div>
                          ))}
                        </div>
                      </SmallSpacer>
                    </div>
                  ))}
                  <SmallSpacer>
                    <div className="mb-4 w-full flex flex-col items-center justify-center  gap-2">
                      <FlyingButton
                        main
                        _id={product._id}
                        dynamicProps={dynamicProps}
                        selectedValues={selectedValues}
                        src={product.images?.[0]}

                      >
                        <p className="uppercase text-[#fff]">  Adaugă în coș</p>
                      </FlyingButton>
                      <h5 className="text-[#595959]">{product.price} RON</h5>
                    </div>
                  </SmallSpacer>
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col items-center justify-center text-center mb-10">
                {product?.scent && Object.entries(product.scent).map(([scentName, scentDescription]) => (
                  <div className="w-1/2" key={scentName}>
                    <h3 className="text-[#595959]">{scentName}</h3>
                    <p className="text-[#595959]">{scentDescription}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10  flex flex-col items-center justify-center">
              <h5 className="text-[#595959] font-bold uppercase">Detalii despre întreţinere</h5>
              <BigSpacer/>
              <div className="flex items-center justify-center gap-[5rem] flex-col lg:gap-[5rem] ">
                <INTRETINERELUMANARI className="w-[100%] lg:w-[40rem] " />
                <INTRETINERECEARA className="w-[100%] lg:w-[40rem] " />
              </div>
            </div>
            <ProductReviews product={product} />
          </div>
        </Layout>
      </div>
      <div className="mt-[30px] lg:mt-[60px]">
        <Footer />
      </div>
    </>
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
