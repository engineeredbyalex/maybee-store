import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";


export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => { },
}) {
  const url = "/product/" + _id
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post("/api/wishlist", {
      product: _id,
    }).then(() => { });
    setIsWished(nextValue);
  }

  return (
    <div className="w-full  flex items-center justify-center flex-col">
      <Link href={url}>
        <div className="h-[20rem] w-[16rem] text-center flex items-center justify-center rounded-2xl relative overflow-hidden">
          <img src={images?.[0]} alt={title} className="max-w-full max-h-full" />
        </div>
      </Link>
      <div className=" max-w-[25rem] text-center flex flex-col items-center justify-center">
        <Link href={url} className="font-light text-[16px] text-black no-underline">
          {title}
        </Link>
        <div className="flex mt-2">
          <span className="text-base font-normal text-black">{price} Ron</span>
          <button
            className={`ml-2 p-2 text-[40px] bg-transparent border-0  absolute top-10 right-0 ${isWished ? "text-red-500" : "text-white"
              }`}
            onClick={addToWishlist}
          >
            {/* {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />} */}
          </button>
        </div>
      </div>
    </div>
  );
}