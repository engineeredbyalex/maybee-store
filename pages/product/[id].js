import React, { useState, useEffect } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Header from "@/components/basic/Header";
import ProductImages from "@/components/product/ProductImages";
import FlyingButton from "@/components/ui/Button";
import ProductReviews from "@/components/reviews/ProductReviews";
import Footer from "@/components/basic/Footer";
import Banner from "@/components/basic/Banner";
import INTRETINERELUMANARI from '@/public/images/instruction_1.svg';
import INTRETINERECEARA from '@/public/images/instruction_2.svg';
import Layout from "@/components/layout/Layout";

export default function ProductPage({ product }) {
  const [selectedValues, setSelectedValues] = useState({});
  const [dynamicProps, setDynamicProps] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const handlePropertyValueChange = (name, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [name]: value,
    }));
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === 'increment' ? prevQuantity + 1 : prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="text-[#000] overflow-x-hidden">
        <Banner />
        <Header />
        {isMobile ? (
          <div className="mt-[5rem] flex flex-col gap-5">
            <Layout>
              <h2 className="text-black font-semibold">{product.title}</h2>
              {!product.newPrice ? (
                <div>
                  <h4 className="font-medium text-black">{product.price} RON</h4>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-2">
                  <h4 className="font-medium text-red-700 line-through">{product.price} RON</h4>
                  <h4 className="font-medium text-[#00]">{product.newPrice} RON</h4>
                </div>
              )}
            </Layout>
            <ProductImages images={product.images} />
            <Layout>
              <div className="w-full lg:w-1/2 mt-4 gap-3 flex flex-row lg:flex-col items-center justify-between">
                <div className="w-1/3 flex items-center justify-between">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="w-[2rem] h-[2rem] text-gray-700 text-lg border border-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-[2rem] text-center border-none focus:ring-0 text-xl"
                  />
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="w-[2rem] h-[2rem] text-gray-700 text-lg border border-gray-200 rounded-full"
                  >
                    +
                  </button>
                </div>
                <div className="w-2/3">
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
            </Layout>
            <div className="mt-10">
              <Layout>
                <h3 className="w-full lg:w-1/2">Descrierea produsului</h3>
                <p className="font-normal text-black mt-5 w-full lg:w-1/2">{product.description}</p>
              </Layout>
            </div>
            <div className="mt-10">
              <Layout>
                <h3 className="mb-5">Detalii produs</h3>
                <h5 className="font-normal text-black">Cantitate produs : {product.weight} g</h5>
                <h5 className="font-normal text-black">Timp de ardere : {product.time}</h5>
                <h5 className="font-normal text-black">Dimensiuni produs : {product.width} cm  {product.width} cm  {product.width} cm </h5>
              </Layout>
            </div>
            {product.scent && (
              <div className="mt-[3.5rem] flex items-center justify-center overflow-hidden">
                <div className="w-full flex flex-col items-center justify-center text-center mb-5 lg:grid grid-cols-2">
                  {Object.entries(product.scent).map(([scentName, scentDescription]) => (
                    <div className="w-1/2 lg:w-full" key={scentName}>
                      <h3 className="text-[#000]">{scentName}</h3>
                      <p className="text-[#000]">{scentDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 w-full flex items-center justify-center">
              <Layout>
                <div className="gap-5 flex flex-col items-start justify-center">
                  <h3 className="text-[#000] font-normal text-left">Detalii despre întreţinere</h3>
                  <div className="w-full flex items-center justify-between gap-5 flex-col lg:flex-row lg:gap-[5rem]">
                    <INTRETINERELUMANARI className="w-[100%] lg:w-[40rem]" />
                    <INTRETINERECEARA className="w-[100%] lg:w-[40rem]" />
                  </div>
                </div>
              </Layout>
            </div>
            <div className="w-full mt-10 flex items-center justify-center">
              <ProductReviews product={product} />
            </div>
            <div className="w-full h-auto py-4 bg-gray-100 shadow-xl fixed bottom-0 flex flex-row items-center justify-center lg:hidden">
              <Layout>
                <div className="w-full gap-5 flex flex-row items-center justify-center">
                  <div className="w-1/2">
                    {!product.newPrice ? (
                      <div className="flex gap-5">
                        <h5 className="font-medium text-black">{product.price} RON</h5>
                      </div>
                    ) : (
                      <div className="flex items-center justify-start gap-2">
                        <h5 className="font-medium text-red-700 line-through">{product.price} RON</h5>
                        <h5 className="font-medium text-[#00]">{product.newPrice} RON</h5>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <FlyingButton
                      main
                      _id={product._id}
                      dynamicProps={dynamicProps}
                      selectedValues={selectedValues}
                      src={product.images?.[0]}
                    >
                      <h5 className="text-white font-normal">Adaugă în coș</h5>
                    </FlyingButton>
                  </div>
                </div>
              </Layout>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="min-h-screen overflow-hidden">
            <div className="mt-[5rem] flex flex-col gap-5">
              <Layout>
                  <div className="flex">
                    <div className="w-1/2">
                      <ProductImages images={product.images} />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-black font-semibold">{product.title}</h2>
                        {!product.newPrice ? (
                          <div className="flex gap-5">
                            <h4 className="font-medium text-black">{product.price} RON</h4>
                          </div>
                        ) : (
                          <div className="flex items-center justify-start gap-2">
                            <h4 className="font-medium text-red-700 line-through">{product.price} RON</h4>
                            <h4 className="font-medium text-[#00]">{product.newPrice} RON</h4>
                          </div>
                        )}
                      </div>
                      <div className="w-full flex flex-col gap-5">
                        {product.properties?.map((property, index) => (
                          <div key={index} className="flex flex-col gap-2">
                            <h5 className="font-semibold uppercase text-[#000]">{property.name}</h5>
                            <div className="flex flex-wrap gap-3">
                              {property.values?.map((value, valueIndex) => (
                                <div
                                  key={valueIndex}
                                  onClick={() => handlePropertyValueChange(property.name, value)}
                                  className={`w-auto min-h-[3rem] px-3 py-2 flex items-center justify-center text-center rounded-md cursor-pointer transition-colors duration-200 ${selectedValues[property.name] === value ? 'bg-[#7F1515] text-white' : 'bg-[#d3d3d3] text-[#000000]'}`}
                                >
                                  <p>{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-full mt-4 gap-3 flex flex-row items-center justify-between">
                        <div className="w-1/3 flex items-center justify-between">
                          <button
                            onClick={() => handleQuantityChange('decrement')}
                            className="w-[2rem] h-[2rem] text-gray-700 text-lg border border-gray-200 rounded-full"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-[2rem] text-center border-none focus:ring-0 text-xl"
                          />
                          <button
                            onClick={() => handleQuantityChange('increment')}
                            className="w-[2rem] h-[2rem] text-gray-700 text-lg border border-gray-200 rounded-full"
                          >
                            +
                          </button>
                        </div>
                        <div className="w-2/3">
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
                  </div>
                </Layout>
                <Layout>
                  <div className="w-full">
                    <h3 className="mb-2 w-full">Descrierea produsului</h3>
                    <p className="font-normal text-black mt-5 w-full">{product.description}</p>
                  </div>
                </Layout>
                <Layout>
                  <div className="w-full flex flex-row">
                    <div className="w-1/2">
                      <h3 className="mb-2">Detalii produs</h3>
                      <h5 className="font-normal text-black">Cantitate produs : {product.weight} g</h5>
                      <h5 className="font-normal text-black">Timp de ardere : {product.time}</h5>
                    </div>
                  </div>
                </Layout>
                {product.scent && (
                  <Layout>
                    <div className="mt-[3.5rem] flex items-center justify-center overflow-hidden">
                      <div className="w-full flex flex-col items-center justify-center text-center mb-5 lg:grid grid-cols-2">
                        {Object.entries(product.scent).map(([scentName, scentDescription]) => (
                          <div className="w-1/2 lg:w-full" key={scentName}>
                            <h3 className="text-[#000]">{scentName}</h3>
                            <p className="text-[#000]">{scentDescription}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Layout>
                )}
                <div>
                  <div className="mt-10 w-full flex items-center justify-center">
                    <div className="gap-5 flex flex-col items-start justify-center">
                      <h3 className="text-[#000] font-normal text-left">Detalii despre întreţinere</h3>
                      <div className="w-full flex items-center justify-between gap-5 flex-col lg:flex-row lg:gap-[5rem]">
                        <INTRETINERELUMANARI className="w-[100%] lg:w-[40rem]" />
                        <INTRETINERECEARA className="w-[100%] lg:w-[40rem]" />
                      </div>
                    </div>
                  </div>
                </div>
                <Layout>
                  <div className="w-full mt-10 flex items-center justify-center">
                    <ProductReviews product={product} />
                  </div>
                </Layout>
              </div>
          </div>
        )}
      </div>
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
