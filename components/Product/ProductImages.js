import { useState } from "react";
export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="gap-[1rem] flex flex-col lg:flex-row-reverse items-start justify-center">
      <div className="text-center">
        <img
          objectFit="cover"
          layout="fill"
          src={activeImage}
          className="w-[25rem] h-[25rem] lg:w-[30.5rem] lg:h-[30.5rem] bg-cover"
          alt="Product Image"
        />
      </div>

      <div className="h-auto grid grid-cols-4 gap-4 content-center lg:flex lg:flex-col">
        {images?.map((image) => (
          <div key={image} onClick={() => setActiveImage(image)}>
            <img
              src={image}
              objectFit="cover"
              layout="fill"
              className="w-[5.5rem] h-[5.5rem] lg:w-[5.3rem] lg:h-[5.3rem]"
              alt="Product Image Small" />
          </div>
        ))}
      </div>
    </div>
  );
}
