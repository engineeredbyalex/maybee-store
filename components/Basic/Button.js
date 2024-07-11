import React from "react";

export default function Button({ children, variant = "solid", ...rest }) {
  let buttonClassName = "w-full text-center flex items-center justify-center px-3 py-2 ";

  // Add styles based on variant
  switch (variant) {
    case "solid_dark":
      buttonClassName += " bg-black text-white ";
      break;
    case "outline_dark":
      buttonClassName += " border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-all ease-in-out";
      break;
    case "solid_light":
      buttonClassName += " bg-[#FDFCED] text-gray-700";
      break;
    case "outline_light":
      buttonClassName += " border-2 border-[#FDFCED] text-[#FDFCED] hover:bg-[#FDFCED] hover:text-gray-700 transition-all ease-in-out";
      break;
    default:
      break;
  }

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}
