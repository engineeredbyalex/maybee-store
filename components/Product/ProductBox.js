// importing link
import Link from "next/link";
// importing Image
import Image from "next/image";
// importing useState and useEffect
import { useState } from "react";

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
}) {
  const url = "/product/" + _id;
  const [hover, setHover] = useState(false);

  return (
    <div className="w-full h-auto flex items-center justify-start flex-col overflow-x-hidden">
      <Link
        href={url}
        className="h-auto w-full gap-2 flex flex-col overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="w-full aspect-w-1 aspect-h-1">
          <Image
            layout="fill"
            objectFit="cover"
            src={hover && images?.[1] ? images?.[1] : images?.[0]}
            alt={title}
            className="w-full h-full"
          />
        </div>
        <div className="text-left text-[#000] w-full flex flex-col items-start justify-center">
          <h6 className="font-medium">{title}</h6>
          <h5 className="font-semibold">{price} RON</h5>
        </div>
      </Link>
    </div>
  );
}
