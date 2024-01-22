// Button.js
import React from "react";
import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

const buttonStyles = css`
  border: 0;
  padding: 0px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  font-size: 15px;
  text-transform: uppercase;
`;

const coalStyles = css`
  background-color: #595959;
  color: #FDFCEA;
`;
const creamStyles = css`
  background-color: #595959;
  color: #FDFCEA;
`;

const coalOutlineStyles = css`
  background-color: transparent;
  color: #FDFCEA;
  border: 1px solid #FDFCEA;
`;
const creamOutlineStyles = css`
  background-color: transparent;
  color: #FDFCEA;
  border: 1px solid #FDFCEA;
`;

const primaryStyles = css`
  background-color: ${primary};
  border: 1px solid ${primary};
  color: #fff;
`;

const primaryOutlineStyles = css`
  background-color: transparent;
  border: 1px solid ${primary};
  color: ${primary};
`;

const sizeLargeStyles = css`
  font-size: 1.2rem;
  padding: 10px 20px;
  svg {
    height: 20px;
  }
`;

const StyledButton = styled.button`
  ${buttonStyles}

  ${props => props.block && 'block w-full'}

  ${props => props.coal && coalStyles}
  ${props => props.coal && props.outline && coalOutlineStyles}

   ${props => props.cream && creamStyles}
  ${props => props.cream && props.outline && creamOutlineStyles}

  ${props => props.primary && !props.outline && primaryStyles}
  ${props => props.primary && props.outline && primaryOutlineStyles}

  ${props => props.size === 'l' && sizeLargeStyles}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
