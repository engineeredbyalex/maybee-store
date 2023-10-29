import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
  border:0;
  padding: 0px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:200;
  font-size: 15px;
  text-transform:uppercase;
  transition:all ease-in-out 0.2s;
  :hover {
    transform:scale(1.05);
          }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
    ${props => props.transparent && !props.outline && css`
    background-color: transparent;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}