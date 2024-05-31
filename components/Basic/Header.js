import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CartContext } from "../Cart/CartContext";
import Image from "next/image";
import { gsap } from "gsap";
import LogoSvg from "@/public/images/Logo.svg";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);
  const navigationBarRef = useRef(null);

  useEffect(() => {
    const navigationBar = navigationBarRef.current;

    if (navigationBar) {
      if (toggle) {
        gsap.to(navigationBar, { backgroundColor: "black", duration: 0.2 });
        gsap.to(navigationBar, { height: '100%', backgroundColor: "black", duration: 0.5, delay: 0.5 });
        gsap.to(".logo_svg", { fill: "#FDFCED", duration: 0.5, });
        gsap.fromTo(".link-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1 });
      } else {
        gsap.to(navigationBar, { height: '7vh' });
        gsap.to(navigationBar, { backgroundColor: "#FDFCED", duration: 0.2, duration: 0.5, delay: 0.5 });
        gsap.to(".logo_svg", { fill: "#595959", duration: 0.5,  });
      }
    }
  }, [toggle]);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth < 768) {
        setToggle(false)
      }
      else {
        null
      }
    })
  }, [])

  return (
    <div ref={navigationBarRef} className="navigation_bar drop-shadow-md">
      <div className="w-full h-[7vh] absolute top-0 flex items-center justify-center ">
        <div className="w-1/3 flex items-center justify-center">
          <LogoSvg className="w-[3rem] md:w-[4rem] lg:w-[3.5rem] h-[3rem] md:h-[4rem] lg:h-[3.5rem] logo_svg" />
        </div>
        <div className={toggle ? "w-screen h-auto absolute top-[50vh] bottom-0 left-0 right-0 text-[#FDFCEA] uppercase  flex flex-col items-center justify-center  z-[5]" : "gap-3 w-1/2 text-[#595959] uppercase font-medium hidden lg:flex items-center justify-center "}>
          <Link href="/"><p className="link-item">Acasă</p></Link>
          <Link href="/products"><p className="link-item">Produse</p></Link>
          <Link href="/categories"><p className="link-item">Catalog</p></Link>
          <Link href="/aboutus"><p className="link-item">Despre noi</p></Link>
        </div>
        <div className="w-1/3 z-[1] gap-5 flex items-center justify-center">
          <Link className="flex items-center justify-center" href="/cart">
            <MdOutlineShoppingCart size={35} color={!toggle ? '#595959' : '#FDFCEA'} />
            <p className={!toggle ? "text-[#595959]" :"text-[#FDFCEA]"}>({cartProducts.length})</p>
          </Link>
          <Link className="" href="/account">
            <MdAccountCircle size={35} color={!toggle ? '#595959' : '#FDFCEA'} />
          </Link>
          <LuMenu className="cursor-pointer lg:hidden" color={!toggle ? '#595959' : '#FDFCEA'}  size={35} onClick={() => setToggle(!toggle)} />
        </div>
      </div>
    </div>
  );
}
