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
import Layout from "@/components/Layout/Layout";
import { SmallSpacer } from "@/components/Layout/Spacer";

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
      <Header />
      <div className="flex items-center justify-center w-full flex-col  min-h-[100vh] bg-[#FDFCEA] mt-[10rem]">
        <Layout>
          <div className="flex flex-col items-center justify-between w-full min-h-screen ">
            <div className="flex flex-row items-center justify-between mt-[5rem]">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                <div className="w-full lg:w-1/2 flex items-center justify-center flex-col">
                  <ProductImages images={product.images} />
                </div>
                <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center text-center">
                  <h4 className="font-bold uppercase leading-[4rem] text-[#595959]">{product.title}</h4>
                  <SmallSpacer>
                    <p className="text-[#595959]">{product.description}</p>
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
                        <div className=" flex flex-col lg:grid grid-cols-3 gap-3">
                          {property.values?.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              onClick={() => handlePropertyValueChange(property.name, value)}
                              className={`px-3 py-2 rounded-md text-white cursor-pointer w-[10rem] ${selectedValues[property.name] === value
                                ? 'bg-[#595959]'
                                : 'bg-slate-300'
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
                    <div className="mb-4 w-full flex items-center justify-center  gap-4">
                      <FlyingButton
                        main
                        _id={product._id}
                        dynamicProps={dynamicProps}
                        selectedValues={selectedValues}
                        src={product.images?.[0]}

                      >
                        <p className="uppercase text-[#fff]">  Adaugă în coș</p>
                      </FlyingButton>
                      <h6 className="text-[#595959] font-bold">{product.price} RON</h6>
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
            <div className="mt-10">
              <div className="flex items-center justify-center gap-[5rem] flex-col lg:gap-[10rem] lg:flex-row  ">
                <Image
                  src={StickerOne}
                  alt="Sticker One"
                  className="w-[24rem] h-[12rem] lg:scale-[1.2]"
                />
                <Image
                  src={StickerTwo}
                  alt="Sticker Two"
                  className="w-[24rem] h-[12rem] lg:scale-[1.2]"
                />
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
