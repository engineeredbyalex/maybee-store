import { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import LogoSvg from "../../public/images/Logo.svg";
import Menu from "../../public/images/Menu.svg";
import Search from "../../public/images/Search.svg";
import Cart from "../../public/images/Cart.svg";
import Account from "../../public/images/Account.svg";
import { CartContext } from "../Cart/CartContext";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const navigationBarRef = useRef(null);
  const { cartProducts } = useContext(CartContext);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const navigationBar = navigationBarRef.current;

    if (navigationBar) {
      if (toggle) {
        gsap.to(navigationBar, { backgroundColor: "#000", duration: 0.2 });
        gsap.to(navigationBar, { height: '95vh', backgroundColor: "#000", overflowY: 'hidden', duration: 0.5, delay: 0.5 });
        gsap.to(".svg_icon", { fill: "#fff", duration: 0.5 });
        gsap.fromTo(".link-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1 });
        document.body.style.overflow = 'hidden';  // Disable scrolling
      } else {
        gsap.to(navigationBar, { height: '4rem' });
        gsap.to(navigationBar, { backgroundColor: "#fff", duration: 0.5, delay: 0.5 });
        gsap.to(".svg_icon", { fill: "#000", duration: 0.5 });
        document.body.style.overflowX = 'hidden';  // Enable scrolling
      }
    }

    return () => {
      document.body.style.overflow = '';  // Cleanup on component unmount or toggle change
    };
  }, [toggle]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToggle(false);
        document.body.style.overflowX = 'hidden';  // Ensure scrolling is enabled on resize
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div ref={navigationBarRef} className="navigation_bar">
        <div className="w-full h-[4rem] absolute top-0 flex items-center justify-center">
          <div className="w-1/2 lg:w-1/3 flex items-center justify-center">
            <LogoSvg className="w-[3rem] md:w-[4rem] lg:w-[3.5rem] h-[3rem] md:h-[4rem] lg:h-[3.5rem] svg_icon" />
          </div>
          <div className={toggle ? "w-screen h-auto absolute top-[50vh] bottom-0 left-0 right-0 text-[#fff] uppercase flex flex-col items-center justify-center z-[5]" : "gap-3 w-1/2 text-[#000] uppercase font-medium hidden lg:flex items-center justify-center"}>
            <Link href="/"><p className="font-[400] text-xl link-item">Acasă</p></Link>
            <Link href="/products"><p className="font-[400] text-xl link-item">Produse</p></Link>
            <Link href="/categories"><p className="font-[400] text-xl link-item">Catalog</p></Link>
            <Link href="/aboutus"><p className="font-[400] text-xl link-item">Despre noi</p></Link>
          </div>
          <div className="w-1/2 lg:w-1/3 z-[1] gap-3 flex items-center justify-center">
            <Link className="flex items-center justify-center" href="/cart">
              <Cart width="35" height="45" className="svg_icon" />
              <p className={!toggle ? "text-[#000]" : "text-[#fff]"}>{cartProducts ? cartProducts.length : 0}</p>
            </Link>
            <Link className="" href="/account">
              <Account width="35" height="45" className="svg_icon" />
            </Link>
            <Link className="" href="/search">
              <Search width="35" height="45" className="svg_icon" />
            </Link>
            <Menu width="35" height="45" className="svg_icon cursor-pointer lg:hidden" onClick={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}
