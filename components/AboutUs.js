import styled from "styled-components";
import Image from "next/image";
import Center from "./Center";
import { SocialIcon } from 'react-social-icons';
import Link from "next/link";
import { RevealWrapper } from "next-reveal";

const AboutSection = styled.section`
  display: flex;
  align-items: center;
  padding: 60px 0;
  min-height:50vh;
  @media (max-width: 768px) {
    display:flex;
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 40px;
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 30px;
  }
`;

const AboutImage = styled(Image)`
  max-width: 100%;
  height: auto;
`;

const RightSection = styled.div`
    display:flex;
    flex-direction:column;
  flex: 1;
  padding-left: 40px;
  text-align:center;
  justify-content:center;
  justify-content:center;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;
const FindMoreWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
const FindMore = styled(Link)`
display:flex;
align-items:center;
justify-content:center;
border:solid 1px #000;
color:#000;
text-decoration:none;
height:3rem;
width:10rem;
margin-bottom:30px;
margin-top:10px;
border-radius:5px;
background: linear-gradient(to right, black 50%, transparent 50%);
background-size: 200% 100%;
background-position: right bottom;
transition: all .5s ease-out;

:hover {
  background-position: left bottom;
  color:#fff;
}
`
const IconsWrapper = styled.div`
display:flex;
justify-content:center;
gap:40px;
`

const SocialIconsStyled = styled(SocialIcon)`
transition:all 0.5s ease-in-out;
:hover{
     transform:scale(1.05);
     position:absolute;
     transform:translateY(-10px);
}
`

export default function AboutUs() {
    return (
    <Center>
      <AboutSection>
        <RevealWrapper origin='bottom' delay={200} duration={500} >
          <LeftSection>
            <AboutImage src="https://maybee-nextjs-ecommerce.s3.eu-north-1.amazonaws.com/aboutUs_photo.jpg" width={400} height={200} alt="About Us Image" />
          </LeftSection>
        </RevealWrapper>
        <RightSection>
          <RevealWrapper origin='bottom' delay={200} duration={500}>
            <SectionTitle>Despre MAYBEE</SectionTitle>
          </RevealWrapper>
          <RevealWrapper origin='bottom' delay={200} duration={500}>
            <Description>
                MAYBEE a fost infiintata in 2023 la incurajarea si sustinerea persoanelor apropiate care au incercat si validat produsele noastre si au fost incantate de fiecare detaliu.
                Ce facem noi? Turnam manual sapunuri, lumanari si ceara parfumate, personalizam parfumurile si tot noi producem si recipientele pentru lumanari. Ne place sa gasim cele mai frumoase variante de impachetare ca tu sa te simti bine si special/a chiar din momentul in care primesti pachetul nostru.
                Lumanarile, ceara si sapunurile noastre sunt 100% naturale facute din produse bio. Parfumurile sunt creatia exclusiv MAYBEE si sunt atent alese si testate. Acestea au la baza uleiuri esentiale bio mergand pe combinatie de note de varf, de mijloc si de baza si au in compozitie de la patru pana la sase arome care se complimenteaza excelent. Ne dorim ca MAYBEE sa fie un brand cat mai personal si mai aproape de tine.
            </Description>
          </RevealWrapper>
          <RevealWrapper origin='bottom' delay={200} duration={500}>
            <FindMoreWrapper>
                <FindMore href={"/aboutus"}>Află mai multe</FindMore>
            </FindMoreWrapper>
          </RevealWrapper>
          <RevealWrapper origin='bottom' delay={200} duration={500}>
            <IconsWrapper>
                <SocialIconsStyled bgColor="#000" url="https://www.facebook.com/maybee.candles" />
            </IconsWrapper>
          </RevealWrapper>
        </RightSection>
      </AboutSection>
    </Center >
  );
}
