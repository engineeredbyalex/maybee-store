import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <div className={`inline-block ${props.disabled ? 'pointer-events-none' : 'pointer-events-auto'} ${props.main ? 'bg-[#595959] border-none text-white' : 'border-1 border-[#595959] text-[#595959]'} ${props.red ? 'bg-[#870000] border-1 border-[#870000] text-[#870000]' : ''} ${props.white ? 'bg-white border-3 border-white font-semibold' : ''} ${props.hover ? 'hover:rounded-full' : ''} m-10`}>
      <button className="flex items-center justify-center h-12 w-48 rounded-md" onClick={() => addProduct(props._id, props.selectedValues)}>
        {props.children}
      </button>
    </div>
  );
}
