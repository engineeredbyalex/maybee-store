import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="gap-10 flex flex-col lg:flex-row-reverse items-center justify-center">
      <div className="text-center">
        <img
          objectFit="cover"
          layout="fill"
          src={activeImage}
          className="w-[25rem] h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-cover"
          alt="Product Image"
        />
      </div>

      <div className="grid grid-cols-3 lg:flex flex-col  gap-5">
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
    </div>
  );
}
