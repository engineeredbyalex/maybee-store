import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "@/components/cart/CartContext";
import Link from "next/link";
import {
  HiMenu,
  HiX,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineSearch,
} from "react-icons/hi";
import Logo from "@/public/images/Logo.svg";
import Banner from "./Banner";
import Login from "../ui/LoginPopup";
import gsap from "gsap";

export default function Header() {
  // State for header toggle and login modal
  const [headerToggle, setHeaderToggle] = useState(false);
  const [loginToggle, setLoginToggle] = useState(false);

  // Get cart products from context
  const { cartProducts } = useContext(CartContext);

  // Ref for mobile menu items
  const menuRef = useRef(null);

  // Toggle functions for header and login
  const toggleHeader = () => setHeaderToggle((prev) => !prev);
  const toggleLogin = () => setLoginToggle((prev) => !prev);

  // Effect to close header on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setHeaderToggle(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect for header animations
  useEffect(() => {
    if (headerToggle) {
      // Animations for opening the header
      gsap.to(".header", {
        backgroundColor: "#252525",
      });
      gsap.to(".header", {
        height: "100vh",
        delay: 0.25,
      });
      gsap.to(".fill_elements", {
        color: "#FFFEF2",
      });
      gsap.to(".logo_color", {
        fill: "#FFFEF2",
      });

      // Animation for menu items
      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: -20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }
    } else {
      // Animations for closing the header
      gsap.to(".header", {
        backgroundColor: "#FFFEF2",
        delay: 1,
      });
      gsap.to(".header", {
        height: "72px",
      });
      gsap.to(".fill_elements", {
        color: "#252525",
        delay: 1,
      });
      gsap.to(".logo_color", {
        fill: "#252525",
        delay: 1,
      });
      if (menuRef.current) {
        gsap.to(menuRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    }
  }, [headerToggle]);

  return (
    <div className="w-full absolute top-0">
      <Banner />
      <div className="header">
        {/* Main header content */}
        <div className="h-[72px] px-10 flex items-center justify-between">
          {/* Logo */}
          <div className="w-1/4 flex items-center justify-start">
            <Link href="/">
              <Logo className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 logo_color" />
            </Link>
          </div>
          {/* Desktop navigation */}
          <nav className="lg:w-1/2 hidden gap-5 lg:flex items-center justify-center">
            <Link href="/">
              <h6 className="fill_elements font-normal">Acasă</h6>
            </Link>
            <Link href="/products">
              <h6 className="fill_elements font-normal">Produse</h6>
            </Link>
            <Link href="/blog">
              <h6 className="fill_elements font-normal">Blog</h6>
            </Link>
            <Link href="/despre_noi">
              <h6 className="fill_elements font-normal">Despre noi</h6>
            </Link>
            <Link href="/contact">
              <h6 className="fill_elements font-normal">Contact</h6>
            </Link>
          </nav>
          {/* User actions */}
          <div className="lg:w-1/4 gap-4 flex items-center justify-end">
            {/* Search button */}
            <Link href="/search" className="fill_elements font-normal">
              <HiOutlineSearch size={24} />
            </Link>
            {/* Login button */}
            <button onClick={toggleLogin} className="fill_elements">
              <span className="hidden lg:flex fill_elements font-normal">
                <h6>Cont</h6>
              </span>
              <HiOutlineUser className="lg:hidden" size={24} />
            </button>
            {/* Cabinet button */}
            <Link href="/cabinet" className="fill_elements">
              <span className="hidden lg:flex fill_elements font-normal">
                <h6>Cabinet</h6>
              </span>
              <HiOutlineHeart className="lg:hidden" size={24} />
            </Link>
            {/* Cart button */}
            <Link
              href="/cart"
              className="fill_elements flex items-center justify-center gap-2"
            >
              <span className="hidden lg:flex fill_elements font-normal">
                <h6>Coș</h6>
              </span>
              <HiOutlineShoppingCart
                className="lg:hidden fill_elements"
                size={24}
              />
              {/* Cart items count */}
              {cartProducts && cartProducts.length > 0 && (
                <span className=" bg-red-500 text-white rounded-full  w-auto h-auto px-2  flex items-center justify-center">
                  <h5> {cartProducts.length}</h5>
                </span>
              )}
            </Link>
            {/* Mobile menu toggle */}
            <button onClick={toggleHeader} className="lg:hidden fill_elements">
              {headerToggle ? <HiX size={30} /> : <HiMenu size={30} />}
            </button>
          </div>
        </div>
        {/* Mobile navigation */}
        <div
          className={`lg:hidden overflow-hidden ${
            headerToggle ? "max-h-[calc(100vh-10vh)]" : "max-h-0"
          }`}
        >
          <div
            ref={menuRef}
            className="gap-5 mt-[35%] flex flex-col items-center justify-center"
          >
            <Link href="/" className="mobile_menu">
              <h6 className="fill_elements font-normal">Acasă</h6>
            </Link>
            <Link href="/products" className="mobile_menu">
              <h6 className="fill_elements font-normal">Produse</h6>
            </Link>
            <Link href="/blog" className="mobile_menu">
              <h6 className="fill_elements font-normal">Blog</h6>
            </Link>
            <Link href="/aboutUs" className="mobile_menu">
              <h6 className="fill_elements font-normal">Despre noi</h6>
            </Link>
            <Link href="/contact" className="mobile_menu">
              <h6 className="fill_elements font-normal">Contact</h6>
            </Link>
          </div>
        </div>
      </div>
      {/* Login modal */}
      {loginToggle && (
        <Login state={loginToggle} updateState={setLoginToggle} />
      )}
    </div>
  );
}
