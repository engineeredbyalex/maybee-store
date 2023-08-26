import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from 'next-reveal'

const StyledProductsGrid = styled.div`
  display: grid;
  width: auto;
  min-height: 100vh;
  grid-template-columns: 1fr;
  margin-left: 20px;
  gap: 30px;
  justify-items: center; /* Horizontally center items */
  align-content: center; /* Vertically center items */

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <StyledProductsGrid interval={100}>
      {products?.length > 0 && products.map((product, index) => (
        <RevealWrapper origin='bottom' duration={1000} key={product._id} delay={index * 50}>
          <ProductBox {...product} wished={wishedProducts.includes(product._id)} />
        </RevealWrapper>
      ))}
    </StyledProductsGrid>
  );
}