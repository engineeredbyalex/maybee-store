import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
}) {
  const url = "/product/" + _id;

  return (
    <div className="w-full flex items-center justify-start flex-col overflow-x-hidden">
      <Link href={url} className="h-auto w-full gap-2 flex flex-col overflow-hidden">
        <div className="w-full h-[24rem] sm:h-[20rem] md:h-[18rem] lg:h-[20rem] relative  overflow-hidden flex items-center justify-center">
          <Image
            layout="fill"
            objectFit="cover"
            src={images?.[0]}
            alt={title}
            className="w-full h-full"
          />
        </div>
        <div className="text-left text-[#000] w-full flex flex-col items-start justify-center ">
          <h5 className="font-semibold">{title}</h5>
          <h6 className="font-normal">{price} RON</h6>
        </div>
      </Link>
    </div>
  );
}
