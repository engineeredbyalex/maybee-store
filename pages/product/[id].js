import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
// importing whitebox
import CenterdWhiteBox from "@/components/CenteredWhiteBox";
import WhiteBox from "@/components/WhiteBox";
// 
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import { useState } from "react";
// importing coution
import StickerOne from "@/public/caution_1.png"
import StickerTwo from "@/public/caution_2.png"
import Image from "next/image";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

const DropdownWrapper = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    
  }
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition:all ease-in-out 0.2s;
    :hover {
       transform:scale(1.02);
    }
  }

`;

const ScentWrapper = styled.div`
h3{
  font-size:22px;
  margin-bottom:-5px;
}
p{
  font-size:16px;
  margin-bottom:12px;
}
`

const StickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;


  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SpacedWhiteBox = styled(WhiteBox)`
  margin-top: 100px; /* Adjust the margin value as needed */
`;



export default function ProductPage({ product }) {
  const [selectedScent, setSelectedScent] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');

  const handleScentChange = (event) => {
    setSelectedScent(event.target.value);
  };

  const handleDecorationChange = (event) => {
    setSelectedDecoration(event.target.value);
  };

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <CenterdWhiteBox>
            <ProductImages images={product.images} />
          </CenterdWhiteBox>
          <WhiteBox>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            {product.properties[0].length > 0 && (
              <DropdownWrapper>
                <label>Selectați parfumul:</label>
                <select value={selectedScent} onChange={handleScentChange}>
                  <option value="">Alegeți un parfum...</option>
                  {product.properties[0].map((parfum, index) => (
                    <option key={index} value={parfum}>
                      {parfum}
                    </option>
                  ))}
                </select>
              </DropdownWrapper>
            )}
            {product.properties[1] && product.properties[1].length > 0 && (
              <DropdownWrapper>
                <label>Selectați decorațiunea:</label>
                <select
                  value={selectedDecoration}
                  onChange={handleDecorationChange}
                >
                  <option value="">Alegeți o decorațiune...</option>
                  {product.properties[1].map((decoratiune, index) => (
                    <option key={index} value={decoratiune}>
                      {decoratiune}
                    </option>
                  ))}
                </select>
              </DropdownWrapper>
            )}
            <div>
              <FlyingButton
                main
                _id={product._id}
                src={product.images?.[0]}
                scent={selectedScent}
                decoration={selectedDecoration}
              >
                Adaugă în coș
              </FlyingButton>
            </div>
            <PriceRow>
              <Price>{product.price} RON</Price>
            </PriceRow>
          </WhiteBox>
        </ColWrapper>
        <WhiteBox>
          <h2>Parfumuri Maybee</h2>
          {product.scent &&
            Object.entries(product.scent).map(([scentName, scentDescription]) => (
              <ScentWrapper key={scentName}>
                <h3>{scentName}</h3>
                <p>{scentDescription}</p>
              </ScentWrapper>
            ))}
        </WhiteBox>
        <SpacedWhiteBox>
        <WhiteBox>
            <StickerWrapper>
              <Image
                layout="responsive"
                width={350}
                height={150}
                src={StickerOne}
                alt="Sticker One"
              />
              <Image
                layout="responsive"
                width={350}
                height={150}
                src={StickerTwo}
                alt="Sticker Two"
              />
            </StickerWrapper>
        </WhiteBox>
        </SpacedWhiteBox>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}