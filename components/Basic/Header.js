import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CartContext } from "../Cart/CartContext";
import Image from "next/image";
import { gsap } from "gsap";
import Logo from "@/public/images/logo_Maybee.png";
import Menu from "@/components/Icons/Bars"
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";

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

        // Reveal links with a delay after the navigation bar expands
        gsap.fromTo(".link-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1 });
      } else {
        gsap.to(navigationBar, { height: '10vh' });
        gsap.to(navigationBar, { backgroundColor: "transparent", duration: 0.2, duration: 0.5, delay: 0.5 });
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
    <div ref={navigationBarRef} className="navigation_bar">
      <div className="w-full flex items-center justify-center h-[10vh] gap-[60px] absolute top-0">
        <div className="w-1/2 lg:w-1/3 flex items-center justify-center">
          <Image src={Logo} alt="logo" width={70}></Image>
        </div>
        <div className={toggle ? ("flex flex-col items-center justify-center w-screen h-auto absolute top-[50vh] bottom-0 left-0 right-0 text-[#FDFCEA] uppercase font-semibold z-[5]") : ("hidden lg:flex items-center justify-center gap-5 w-1/3 text-[#595959] uppercase font-bold")}>
          <Link href={'/'}><p className="link-item">Acasă</p></Link>
          <Link href={'/products'}><p className="link-item">Produse</p></Link>
          <Link href={'/categories'}><p className="link-item">Catalog</p></Link>
          <Link href={'/aboutus'}><p className="link-item">Despre noi</p></Link>
        </div>
        <div className={toggle ? ("flex flex-col items-center justify-center w-screen h-auto absolute top-[80vh] bottom-0 left-0 right-0 text-[#FDFCEA] uppercase font-semibold z-[2]") : ("lg:w-1/3 hidden lg:flex items-center justify-center gap-5 text-[#595959] uppercase font-semibold")}>
          <Link className="flex items-center justify-center link-item " href={"/cart"}>
            <MdOutlineShoppingCart size={30} />
            <p>({cartProducts.length})</p>
          </Link>
          <Link className="link-item" href={"/account"}>
            <MdAccountCircle size={30} />
          </Link>
        </div>
        <div className="cursor-pointer flex items-center justify-center lg:hidden lg:w-1/3 w-1/2 z-[1]" onClick={() => setToggle(!toggle)}>
          <Menu />
        </div>
      </div>
    </div>
  );
}
