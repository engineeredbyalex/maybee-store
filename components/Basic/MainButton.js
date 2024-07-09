import { CartContext } from "../Cart/CartContext";
import { useContext, useState, useEffect } from "react";
import Cart from "../../public/icons/shopping_cart_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24.svg";
import { gsap } from "gsap";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      const tl = gsap.timeline();
      tl.to(".cartButton", { backgroundColor: "#34C759", duration: 0.5 })
        .to(".cartIcon", { scale: 1.5, duration: 0.5 }, "-=0.5") // Scale up the icon to 1.5 times
        .to(".cartButton", { backgroundColor: "#000", duration: 0.5, delay: 0.5 })
        .to(".cartIcon", { scale: 1, duration: 0.5 }, "-=0.5"); // Scale back the icon to original
    } else {
      gsap.to(".cartButton", { backgroundColor: "#000", duration: 0.5 });
      gsap.to(".cartIcon", { scale: 1, duration: 0.5 });
    }
  }, [toggle]);

  const handleClick = () => {
    addProduct(props._id, props.selectedValues);
    setToggle(true);
    setTimeout(() => setToggle(false), 1500); // Reset toggle after 1.5 seconds
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
        <Cart className="cartIcon ml-2 h-7 w-7 transition-transform duration-300" />
      </button>
    </div>
  );
}
