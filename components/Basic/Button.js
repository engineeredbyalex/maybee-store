import React from "react";

export default function Button({ children, variant = "solid", ...rest }) {
  let buttonClassName = "min-w-[15rem] max-h-[10rem] text-center flex items-center justify-center px-3 py-2 rounded-md";

  // Add styles based on variant
  switch (variant) {
    case "solid_dark":
      buttonClassName += " bg-[#595959] text-[#FDFCED]";
      break;
    case "outline_dark":
      buttonClassName += " border-[0.2rem] border-[#595959] text-[#595959] hover:bg-[#595959] hover:text-[#FDFCEA] transition-all ease-in-out";
      break;
    case "solid_light":
      buttonClassName += " bg-[#FDFCED] text-[#595959]";
      break;
    case "outline_light":
      buttonClassName += " border-[0.2rem] border-[#FDFCED] text-[#FDFCED] hover:bg-[#FDFCED] hover:text-[#595959] transition-all ease-in-out";
      break;
    default:
      break;
  }

  return <button className={buttonClassName} {...rest}><h5 className="uppercase">{children}</h5></button>;
}
