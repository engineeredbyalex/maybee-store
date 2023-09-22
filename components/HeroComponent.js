import styled from "styled-components";
import Image from "next/image";
import { RevealWrapper } from "next-reveal";


const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://maybee-nextjs-ecommerce.s3.eu-north-1.amazonaws.com/banner_photo.jpg"); /* Set the background image */
  background-position: center;
  background-size: cover;
  background-color: #DEE2E6;
  color: #252525;
  width: 100vw;
  height: 300px; /* Use full viewport height */
`;

export default function MainHeader() {
  return (
    <StyledHeader>
      <RevealWrapper origin='bottom' delay={200} duration={1000}>
        <Image alt="" width={300} height={300} src={"https://maybee-nextjs-ecommerce.s3.eu-north-1.amazonaws.com/logoBig.png"} />
      </RevealWrapper>
    </StyledHeader>
  );
}
