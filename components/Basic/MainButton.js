import styled from "styled-components";
import { ButtonStyle } from "@/components/Basic/Button";
import { CartContext } from "@/components/Cart/CartContext";
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
    ${ButtonStyle};

    background-color: ${props => props.main ? "#252525" : "transparent"};
    border: ${props => props.main ? "none" : "1px solid #252525"};
    color: ${props => props.main ? "white" : "#252525"};
    pointer-events: ${props => props.disabled ? "none" : "auto"}; /* Disable pointer events if disabled prop is true */

    ${props => props.white && `
      background-color: white;
      border: 3px solid white;
      font-weight: 500;
    `}
  }

  &:hover {
    button {
      transform: ${props => (props.disabled ? "none" : "scale(1.02)")};
    }
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <FlyingButtonWrapper
      white={props.white}
      main={props.main}
      scent={props.scent}
      decoration={props.decoration}
      disabled={props.disabled} // Pass the disabled prop to the wrapper
    >
      <button onClick={() => addProduct(props._id, props.scent, props.decoration)}>
        {props.children}
      </button>
    </FlyingButtonWrapper>
  );
}