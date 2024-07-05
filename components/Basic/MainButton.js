import { CartContext } from "../Cart/CartContext";
import { useContext, useState, useEffect } from "react";
import Cart from "../../public/images/Cart.svg";
import { gsap } from "gsap";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      gsap.to(".cartButton", { backgroundColor: "#33B249", duration: 0.5 });
      // gsap.to(".cartButton", { backgroundColor: "#000", delay: 1, duration: 0.5 });
    } else {
      gsap.to(".cartButton", { backgroundColor: "#000", duration: 0.5 });
    }
  }, [toggle]);

  const handleClick = () => {
    addProduct(props._id, props.selectedValues);
    setToggle(true);
    setTimeout(() => setToggle(false), 1000); // Reset toggle after 1.5 seconds
  };

  return (
    <div className={`${props.disabled ? 'pointer-events-none' : 'pointer-events-auto'} w-full`}>
      <button
        className="cartButton w-full flex items-center justify-center bg-black text-white px-4 py-2 rounded-md transition-colors duration-500"
        onClick={handleClick}
        disabled={props.disabled}
      >
        <div className="w-2/3 flex items-center justify-center">
          {props.children}
        </div>
        <Cart className="ml-2" />
      </button>
    </div>
  );
}
