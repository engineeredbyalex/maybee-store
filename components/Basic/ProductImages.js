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
          className="w-full h-full lg:w-[30rem] lg:h-[30rem]"
          alt="Product Image"
        />
      </div>

      <div className="w-[30rem] flex justify-between mt-10">
        {images?.map((image) => (
          <div key={image} onClick={() => setActiveImage(image)}>
            <img
              src={image}
              objectFit="cover"
              layout="fill"
              className="w-[4rem] lg:h-[5rem] h-[4rem] lg:w-[5rem]"
              alt="Product Image Small" />
          </div>
        ))}
      </div>
    </>
  );
}
