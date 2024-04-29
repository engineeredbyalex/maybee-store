// importing link
import { RevealWrapper } from "next-reveal";
// importing link
import HeroImage from '@/public/images/heroPhoto.jpg'
// importing link
import Button from "../Basic/Button";
// importing link
import Link from "next/link";

export default function MainHeader() {
  const logo = "https://maybee-nextjs-ecommerce.s3.eu-north-1.amazonaws.com/logoBig.png";

  const divStyle = {
    backgroundImage: `url(${HeroImage.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={divStyle}>
      <RevealWrapper origin='bottom' delay={200} duration={1000}>
        <h5 className="text-[#FDFCED] uppercase font-bold text-center">Creat cu grijă şi atenţie</h5>
        <img alt="logo" width={300} height={300} src={logo} />
        <Button variant="outline_light">
          <Link href='/products' >
            Vezi toate produsele
          </Link>
          </Button>
      </RevealWrapper>
    </div>
  );
}
