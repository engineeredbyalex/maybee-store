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
      <Link href={url} className="h-auto max-w-full gap-2 flex flex-col overflow-hidden">
        <div className="w-full h-[24rem] sm:h-[20rem] md:h-[18rem] lg:h-[20rem] relative rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            layout="fill"
            objectFit="cover"
            src={images?.[0]}
            alt={title}
            className="w-full h-full"
          />
        </div>
        <div className="w-screen text-left flex flex-col items-start justify-center gap-1 ">
          <p className="font-semibold">{title}</p>
          <p className="font-medium text-[#000] ">{price} Ron</p>
        </div>
      </Link>
    </div>
  );
}
