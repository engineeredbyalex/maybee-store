import { RevealWrapper } from "next-reveal";
import HeroImage from '@/public/images/heroPhoto.jpg'

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
        <img alt="logo" width={300} height={300} src={logo} />
      </RevealWrapper>
    </div>
  );
}
