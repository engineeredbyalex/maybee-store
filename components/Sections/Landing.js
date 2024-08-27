// importing image
import Image from "next/image";
// importing Link
import Link from "next/link";
// importing landing image
import LandingImage from "@/public/images/heroPhoto.jpg";
// importing icons
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function Landing() {
  return (
    <div className="w-screen h-auto mt-[106px]  flex items-center justify-center">
      <div className="w-full h-full gap-10 lg:gap-20 px-5 lg:px-10 flex flex-col lg:flex-row items-center justify-center ">
        <div className="w-full h-1/2 lg:h-full lg:w-1/2  text-[#252525] gap-6 flex flex-col items-start justify-center">
          <div className="gap-6 flex flex-col">
            <h1 className="font-bold uppercase">Enjoy a premium gift</h1>
            <h6 className="font-normal">
              Receive a complimentary sample of Mandarin Facial Hydrating
              Cream—a rapidly absorbed, lightly hydrating formulation replete
              with citrus-derived botanicals—with all orders over €150.
            </h6>
          </div>
          <Link className="w-full lg:w-1/2" href="/products">
            <button className="button button_outline transition flex justify-between items-center space-x-2">
              <span>Vezi toate produsele noastre</span>
              <HiOutlineArrowNarrowRight size={24} />
            </button>
          </Link>
        </div>
        <div className="w-full h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center ">
          <Image
            src={LandingImage}
            alt="Landing Image"
            className="object-cover object-center w-full max-h-[40rem]"
          />
        </div>
      </div>
    </div>
  );
}
