import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";
import Cart from "../../public/images/Cart.svg";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <div className={`${props.disabled ? 'pointer-events-none' : 'pointer-events-auto'} w-full`}>
      <button
        className="w-full h-12 rounded-md  py-2 px-3 bg-[#000] flex items-center justify-center text-white"
        onClick={() => addProduct(props._id, props.selectedValues)}
        disabled={props.disabled}
      >
        <div className="w-2/3">
          {props.children}  
        </div>
        <Cart />
      </button>
    </div>
  );
}
