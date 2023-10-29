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
    width: 10rem;
    ${ButtonStyle};

    background-color: ${props => props.main ? "#252525" : "transparent"};
    border: ${props => props.main ? "none" : "1px solid #252525"};
    color: ${props => props.main ? "white" : "#252525"};

    ${props => props.white && `
      background-color: white;
      border: 3px solid white;
      font-weight: 500;
    `}
  }

  &:hover {
    button {
      transform: scale(1.02);
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
    >
      <button onClick={() => addProduct(props._id, props.scent, props.decoration)}>
        {props.children}
      </button>
    </FlyingButtonWrapper>
  );
}