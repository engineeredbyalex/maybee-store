import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 2rem;
  margin:30px 0px 20px 0px;
  font-weight: normal;
  text-transform:uppercase;

`;

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <Title>Produse noi</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}