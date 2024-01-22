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
    <div className="w-full  flex items-start justify-center flex-col">
      <Link href={url}>
        <div className="h-auto w-autoflex items-center justify-center rounded-2xl relative overflow-hidden">
          <img src={images?.[0]} alt={title} className="max-w-full max-h-full" />
        </div>
      </Link>
      <div className=" max-w-[25rem] text-left flex flex-col items-center justify-center">
        <Link href={url} className="text-[#595959] no-underline">
          <p className="font-bold">{title}</p>
        </Link>
        <div className="flex items-start justify-start w-full ">
          <p className=" font-semibold text-[#595959]">{price} Ron</p>
          {/* <button
            className={`ml-2 p-2 bg-transparent border-0  absolute top-10 right-0 ${isWished ? "text-red-500" : "text-white"
              }`}
            onClick={addToWishlist}
          >
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </button> */}
        </div>
      </div>
    </div>
  );
}