import styled from "styled-components"

const StyledBanner = styled.div`
background-color:#000;
text-align:center;
z-index:12;
`
export default function Banner() {
    return (
        <StyledBanner>
            <p>CREAT CU GRIJĂ și atenție - MAYBEE</p>
        </StyledBanner>
    )
}