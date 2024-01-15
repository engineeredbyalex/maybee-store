import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <div className="text-center">
        <img
          src={activeImage}
          className="max-w-full max-h-full"
          alt="Big Image"
        />
      </div>

      <div className="flex gap-10 mt-10">
        {images?.map((image) => (
          <div
            key={image}
            onClick={() => setActiveImage(image)}
            className={`h-50 ${image === activeImage ? "" : "border-transparent"
              } cursor-pointer rounded-md`}
          >
            <img src={image} className="w-[4rem] lg:w-[8rem] h-[4rem] lg:h-[8rem]" alt="product image" />
          </div>
        ))}
      </div>
    </>
  );
}
