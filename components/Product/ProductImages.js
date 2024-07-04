import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="gap-4 flex flex-col  items-center justify-center">
      <div className="text-center">
        <img
          src={activeImage}
          className="w-full object-cover rounded-xl"
          alt="Product Image"
        />
      </div>

      <div className="h-auto flex flex-row gap-4 content-center">
        {images?.map((image) => (
          <div key={image} onClick={() => setActiveImage(image)} className="cursor-pointer">
            <img
              src={image}
              className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg"
              alt="Product Thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
