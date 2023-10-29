
import Header from "@/components/Basic/Header";

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

import Image from "next/image";

import ProductImages from "@/components/Basic/ProductImages";
import FlyingButton from "@/components/Basic/MainButton";
import ProductReviews from "@/components/Reviews/ProductReviews";
import { useState } from "react";
// importing images
import StickerOne from "@/public/caution_1.png"
import StickerTwo from "@/public/caution_2.png"
import Center from "@/components/Layout/Center";
import Footer from "@/components/Basic/Footer";




export default function ProductPage({ product }) {
  const [selectedScent, setSelectedScent] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');

  const handleScentChange = (event) => {
    setSelectedScent(event.target.value);
  };

  const handleDecorationChange = (event) => {
    setSelectedDecoration(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full flex-col mt-[10rem] min-h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="w-full flex flex-col items-center justify-center gap-[50px] lg:flex-row  lg:items-start ">
            {/* Imagine */}
            <div className="lg:max-w-[400px] lg:max-h-[400px] max-w-[300px] max-h-[300px] mb-[5rem]">
              <ProductImages images={product.images} />
            </div>
            {/* Imagine */}
            {/* Text si butoane */}
            <div className="lg:w-1/2 w-full flex flex-col items-center text-center">
              <h1 className="text-2xl md:text-3xl mb-5">{product.title}</h1>
              <p>{product.description}</p>
              {product.properties[0].length > 0 && (
                <div className="mb-4 text-center">
                  <label className="block mb-2 mt-5"><p className="text-2xl">Selectați parfumul :</p></label>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {product.properties[0].map((parfum, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedScent(parfum)}
                        className={`px-4 py-2 border border-gray-300 rounded-full transition-all ease-in-out duration-200 hover:scale-102 ${selectedScent === parfum ? 'bg-blue-500 text-white' : 'bg-white'
                          }`}
                      >
                        {parfum}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product.properties[1] && product.properties[1].length > 0 && (
                <div className="mb-4 text-center flex flex-col items-center justify-center">
                  <label className="block mb-2 mt-5 text-center"><p className="text-2xl">Selectați decotațiunea :</p></label>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {product.properties[1].map((decoratiune, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDecoration(decoratiune)}
                        className={`px-4 py-2 border border-gray-300 rounded-full transition-all ease-in-out duration-200 hover:scale-102 ${selectedDecoration === decoratiune ? 'bg-blue-500 text-white' : 'bg-white'
                          }`}
                      >
                        {decoratiune}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-4 w-full flex items-center justify-center  gap-4">
                <FlyingButton
                  main
                  _id={product._id}
                  src={product.images?.[0]}
                  scent={selectedScent}
                  decoration={selectedDecoration}
                >
                  Adaugă în coș
                </FlyingButton>
                <span className="text-2xl ">{product.price} RON</span>
              </div>
            </div>

            {/* Text si butoane */}
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center text-center  ">
          <h2 className="text-2xl md:text-3xl lg:text-5xl mb-10">Parfumuri Maybee</h2>
          {product.scent &&
            Object.entries(product.scent).map(([scentName, scentDescription]) => (
              <div key={scentName} className="mb-6 w-full lg:w-1/2 max-h-[35rem] flex items-center justify-center flex-col bg-gray-200 rounded-2xl p-5">
                <h3 className="text-xl md:text-2xl">{scentName}</h3>
                <p className="text-lg max-w-full">{scentDescription}</p>
              </div>
            ))}
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center gap-8 flex-col">
            <Image
              src={StickerOne}
              alt="Sticker One"
              className="w-[350px] h-[150px]"
            />
            <Image
              src={StickerTwo}
              alt="Sticker Two"
              className="w-[350px] h-[150px]"
            />
          </div>
        </div>
        <ProductReviews product={product} />
      </div>
      <Footer />
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