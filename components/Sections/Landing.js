import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import LandingImage from "@/public/images/heroPhoto.jpg"
import Link from "next/link";

export default function Landing() {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/api/settings").then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
    axios.get("/api/products").then((res) => {
      setFeaturedProduct(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="w-screen h-auto mt-[9vh]">
      <div className="h-full w-full gap-10 px-5 flex flex-col-reverse items-center justify-center lg:flex-row lg:px-10 lg:gap-10">
        <div className="w-full h-full text-[#252525] flex flex-col items-start justify-center lg:w-1/2 lg:h-full">
          <h5 className="font-normal">Online only for a limited time</h5>
          <h4 className="font-semibold mb-2 uppercase">Enjoy a premium gift</h4>
          <h6 className="font-normal mb-4">
            Receive a complimentary sample of Mandarin Facial Hydrating Cream—a
            rapidly absorbed, lightly hydrating formulation replete with
            citrus-derived botanicals—with all orders over €150.
          </h6>
          <Link className="w-full lg:w-1/2" href="/products">
            <button className="button button_outline transition flex justify-between items-center space-x-2">
              <span>Vezi toate produsele noastre</span>
              <HiOutlineArrowNarrowRight size={24} />
            </button>
          </Link>
        </div>
        <div className="w-full h-1/2 flex items-center justify-center lg:h-full lg:w-1/2">
          <Image
            src={LandingImage}
            alt="Landing Image"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
