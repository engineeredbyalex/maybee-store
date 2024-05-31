// importing link
import { RevealWrapper } from "next-reveal";
// importing link
import HeroImage from '@/public/images/heroPhoto.jpg'
// importing link
import Button from "../Basic/Button";
// importing link
import Link from "next/link";
// importing Logo
import LogoSvg from "@/public/images/Logo.svg"

export default function MainHeader() {

  const divStyle = {
    backgroundImage: `url(${HeroImage.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={divStyle}>
      <RevealWrapper className="w-full h-full flex  flex-col items-center justify-center" origin='bottom' delay={200} duration={1000}>
        <LogoSvg className= "h-[10rem] fill-[#FDFCED]" />
        <h5 className="text-[#FDFCED]  uppercase font-bold text-center">Creat cu grijă şi atenţie</h5>

      </RevealWrapper>
    </div>
  );
}
