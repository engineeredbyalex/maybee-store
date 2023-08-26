import styled from "styled-components"

const StyledBanner = styled.div`
background-color:#000;
text-align:center;
padding:5px;
z-index:12;
p {
    text-transform:uppercase;
    color: #fff;
    margin-left:70px;
}
@media screen and (max-width:768px) {
    p{
        margin-left:0px;
    }
}
`

export default function Banner() {
    return (
        <StyledBanner>
            <p>CREAT CU GRIJĂ și atenție - MAYBEE</p>
        </StyledBanner>
    )
}