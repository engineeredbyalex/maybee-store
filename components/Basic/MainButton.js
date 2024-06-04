import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <div className={`${props.disabled ? 'pointer-events-none' : 'pointer-events-auto'} w-full`}>
      <button
        className="w-full h-12 rounded-md bg-[#000] py-2 px-3 flex items-center justify-center text-white hover:bg-[#A01C1C] transition-colors duration-200"
        onClick={() => addProduct(props._id, props.selectedValues)}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
}
