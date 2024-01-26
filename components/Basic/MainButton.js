import styled from "styled-components";
import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

const FlyingButtonWrapper = styled.div`
  display: inline-block;
  margin: 10px 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 12rem;
    

    background-color: ${props => props.main ? "#595959" : "transparent" || props.red ? "#870000" : "transparent"};
border: ${props => props.main ? "none" : "1px solid #595959" || props.red ? "#870000" : "transparent"};
color: ${props => props.main ? "white" : "#595959" || props.red ? "#870000" : "transparent"};
    pointer-events: ${props => props.disabled ? "none" : "auto"};

    ${props => props.white && `
      background-color: white;
      border: 3px solid white;
      font-weight: 500;
    `}
      ${
  props => props.red && `
      background-color: #870000;
      border: 3px solid #870000;
      font-weight: 500;
    `}
  }

  &:hover {
    button {
      border-radius:10rem,
    }
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <FlyingButtonWrapper
      white={props.white}
      main={props.main}
      disabled={props.disabled}
    >
      <button className="rounded-md" onClick={() => addProduct(props._id, props.selectedValues)}>
        {props.children}
      </button>
    </FlyingButtonWrapper>
  );
}
