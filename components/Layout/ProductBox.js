// importing React useState
import React, { useState } from "react";
// importing Link
import Link from "next/link";
// importing axios
import axios from "axios";
// importing image
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
    <div className="w-full flex items-center justify-center flex-col">
      <Link href={url}>
        <div className="w-[50%] h-[50%] md:w-[15rem] md:h-[15rem] lg:w-[30rem] lg:h-[30rem] rounded-2xl relative overflow-hidden flex items-center justify-center  ">
          <Image
            layout="fill"
            objectFit="cover"
            src={images?.[0]}
            alt={title}
          />
        </div>
      </Link>
      <div className="max-w-[25rem] min-h-[8rem] text-center flex flex-col items-center justify-start ">
        <Link href={url} className="text-[#595959]">
          <p className="font-bold">{title}</p>
        </Link>
        <div className="flex items-center justify-center w-full">
          <p className="font-medium text-[#595959]">{price} Ron</p>
        </div>
      </div>
    </div>
  );
}
