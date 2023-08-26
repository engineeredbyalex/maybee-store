import styled from "styled-components"
import Center from "./Center"
import logoSmall from "../public/logoSmall.png"
import Image from "next/image"
import ANPC_ONE from "@/assets/images/logo1.png"
import ANPC_TWO from "@/assets/images/anpc-sol.webp"

const StyledFooter = styled.div`
  background-color: #CED4DA;
  position:sticky;
  top:0;
  z-index:6;
  margin-top:5rem;
`
const StyledGrid = styled.div`
display:grid;
grid-template-columns:3fr 3fr ;
padding: 0.8rem;
@media screen and (max-width:768px) {
    display:flex;
    flex-direction:column;
    gap:30px;
}
`
const StyledColumn = styled.div`
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;

h2{
    font-weight:lighter;
    font-size:22px;
}
p{
    font-weight:lighter;
    font-size:16px;
}
a{
    text-decoration:none;
    color:#252525;
    font-size:18px;
    
}

`
const StyledBuild = styled.div`
background-color:#000;
color:white;
display:flex; 
align-items:center;
justify-content:center;
padding:0.3rem;
flex-direction:column;
a{
    color:white;
    text-decoration:none;
}
p{
    margin:0;
}
`
export default function Footer() {
    return (

        <StyledFooter>
            <StyledGrid>
                <StyledColumn>
                    <Image width={70} src={logoSmall} alt="logo" />
                    <p>Email : contact@maybee.ro</p>
                    <p>Mixed Arts Events SRL</p>
                    <p>CUI : 38795036</p>
                    <p>Adresă : Timișoara, jud Timiș</p>
                </StyledColumn>
                <StyledColumn>
                    <h2>Întrebări puse frecvent</h2>
                    <a href="/faq"><p>Procesul de livrare</p></a>
                    <a href="/faq"><p>Procesul de fabricație</p></a>
                    <a href="/faq"><p>Procesarea datelor</p></a>
                </StyledColumn>
            </StyledGrid>
            <StyledGrid>
                <StyledColumn>
                    <Image width={150} src={ANPC_ONE} />
                    <a href="https://anpc.ro/ce-este-sal" target="_blank">
                        <p>https://anpc.ro/ce-este-sal/</p>
                    </a>
                </StyledColumn>
                <StyledColumn>
                    <Image width={150} src={ANPC_TWO} />
                    <a href="https://ec.europa.eu/consumers/odr/main/?event=main.home2.show" target="_blank">
                        <p>https://ec.europa.eu/consumers/odr/main/?event=main.home2.show</p>
                    </a>
                </StyledColumn>
            </StyledGrid>
            <StyledBuild>
                <p>
                    CONSTRUIT DE :
                </p>
                <p>
                    <a target="_blank" href="https://www.alexlazarescu.com/">alexlazarescu.com</a>
                </p>
            </StyledBuild>
        </StyledFooter >
    )
}