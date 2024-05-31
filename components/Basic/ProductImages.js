import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <div className="text-center">
        <img
          objectFit="cover"
          layout="fill"
          src={activeImage}
          className="w-[25rem] h-[25rem] lg:w-[30rem] lg:h-[30rem]"
          alt="Product Image"
        />
      </div>

      <div className="w-[25rem] lg:w-[30rem] gap-5 grid grid-cols-4 lg:flex justify-evenly mt-10">
        {images?.map((image) => (
          <div key={image} onClick={() => setActiveImage(image)}>
            <img
              src={image}
              objectFit="cover"
              layout="fill"
              className="w-[5rem] lg:h-[5rem] h-[5rem] lg:w-[5rem]"
              alt="Product Image Small" />
          </div>
        ))}
      </div>
    </>
  );
}
