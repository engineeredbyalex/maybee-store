import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <div className={`${props.disabled ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      <button className="flex items-center justify-center min-w-[15rem] max-h-[10rem]  rounded-md bg-[#595959] py-2" onClick={() => addProduct(props._id, props.selectedValues)}>
        {props.children}
      </button>
    </div>
  );
}
