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
        gsap.to(".svg_icon", { fill: "#fff", color: "#fff", duration: 0.5 });
        gsap.fromTo(".link-item", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1 });
        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(navigationBar, { height: '72px' });
        gsap.to(navigationBar, { backgroundColor: "#fff", duration: 0.5, delay: 0.5 });
        gsap.to(".svg_icon", { fill: "#000", color: "#000",duration: 0.5 });
        document.body.style.overflowX = 'hidden';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [toggle]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToggle(false);
        document.body.style.overflowX = 'hidden';
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav ="w-screen h-auto top-[40vh] bottom-0 left-0 right-0 gap-5 absolute text-[#fff] uppercase flex flex-col items-center justify-center z-[5] "
  const unToggleNav = "gap-[40px] w-1/2 text-[#000] uppercase hidden md:hidden lg:hidden xl:flex items-center justify-center"

  return (
    <div>
      <div ref={navigationBarRef} className="navigation_bar">
        <div className="absolute top-4 md:top-2 lg:top-1 xl:top-1.5 w-full h-auto flex items-center justify-center ">
          <div className="ml-[1.5rem] md:ml-[2rem] lg:ml-[2.5rem] w-1/2 md:w-1/3 flex items-center justify-start ">
            <Link href={'/'}>
              <LogoSvg className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 svg_icon" />
            </Link>
          </div>
          <div className={toggle ? toggleNav : unToggleNav}>
            <Link href="/"><p className="font-normal link-item">Acasă</p></Link>
            <Link href="/products"><p className="font-normal link-item">Produse</p></Link>
            <Link href="/categories"><p className="font-normal link-item">Catalog</p></Link>
            <Link href="/blog"><p className="font-normal link-item">Blog</p></Link>
            <Link href="/aboutus"><p className="font-normal text-center link-item">Despre noi</p></Link>
          </div>
          <div className="mr-[1.5rem] md:mr-[2rem] lg:mr-[2.5rem] gap-[0.75rem] md:gap-[1rem] lg:gap-[1.25rem] w-1/2 md:w-1/3 z-[1] flex items-center justify-end ">
            <Link href="/cart" className="gap-1 flex items-center">
              <Cart className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 svg_icon" />
              <p className="svg_icon">{cartProducts ? cartProducts.length : 0}</p>
            </Link>
            <Link href="/account">
              <Account className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 svg_icon" />
            </Link>
            <Link href="/search">
              <Search className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 svg_icon" />
            </Link>
            <Menu className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 svg_icon cursor-pointer xl:hidden" onClick={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
}
