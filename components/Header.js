import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import Banner from "./Banner";
import LogoImg from "@/public/logoSmall.png"
import { MdAccountCircle } from "react-icons/md"
import { MdSearch } from "react-icons/md"
import { MdShoppingCart } from "react-icons/md"
import { MdMenu } from "react-icons/md"

const StyledHeader = styled.header`
  background-color: #CAD4DA;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color:#252525;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0px;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #CAD4DA;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    align-items:center;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: flex;
  align-items:center;
  color:#252525;
  text-decoration:none;
  min-width:30px;
  padding: 10px 0;
  font-size:26px;
  @media screen and (min-width: 768px) {
    padding:0;
    font-size:20px;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: #252525;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  gap:30px;
  a{
    color:#252525;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isMobile, setMobile] = useState()



  useEffect(() => {
    if (window.innerWidth < 786) {
      setMobile(true)
    }
    else {
      setMobile(false)
    }

  }, [])

  return (
    <StyledHeader>
      <Banner />
      <Center>
        <Wrapper>
          <Logo href={'/'}><Image alt="" width={70} height={70} src={LogoImg} /></Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Acasă</NavLink>
            <NavLink href={'/products'}>Toate produsele</NavLink>
            <NavLink href={'/categories'}>Categorii</NavLink>
            <NavLink href={'/cart'}><MdShoppingCart size={28} /> ({cartProducts.length})</NavLink>
            <NavLink href={'/account'}><MdAccountCircle size={28} /></NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><MdSearch size={28} /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <MdMenu size={28} />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}