import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const ProductWrapper = styled.div`
  button{
  width: 100%;
  text-align: left;
  justify-content: center;
  }
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  height:25rem;
  border-radius:2rem;
  transition:all ease-in-out 0.5s;

  :hover {
    transform:scale(1.03);
    transform:translateY(-30px);
  }

`;

const WhiteBox = styled(Link)`
  padding: 20px;
  height: 150px;
  width:150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img{
    max-width: 200px;
    max-height: 200px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:1rem;
  color:inherit;
  text-decoration:none;
  margin:20px 0px 20px 0px;
  height:auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:start;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  max-width:10rem;
  display:flex;
  flex-direction:column;
  align-items:start;
  text-align:start;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction:column;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight:400;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    font-size:18px;
    text-align: center;
  }
`;


export default function ProductBox({
  _id, title, description, price, images, wished = false,
  onRemoveFromWishlist = () => { },
}) {
  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post('/api/wishlist', {
      product: _id,
    }).then(() => { });
    setIsWished(nextValue);
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <Image src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {price} RON
          </Price>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}


// import styled from "styled-components";
// import Link from "next/link";
// import { useState } from "react";
// import FlyingButton from "@/components/FlyingButton";
// import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
// import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
// import axios from "axios";

// const ProductWrapper = styled.div`
//   button{
//   width: 100%;
//   text-align: center;
//   justify-content: center;
//   }
//   display:flex;
//   align-items:center;
//   justify-content:center;
//   flex-direction:column;
//   height:25rem;
//   width:20rem;
//   border-radius:2rem;
//   transition:all ease-in-out 0.2s;

//   :hover {
//     transform:scale(1.03);
//   }

// `;

// const WhiteBox = styled(Link)`
//   /* background-color: #CED4DA; */
//   padding: 20px;
//   height: 150px;
//   width:150px;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   position: relative;
//   img{
//     max-width: 200px;
//     max-height: 200px;
//     border-radius : 10%;
//   }
// `;

// const Title = styled(Link)`
//   font-weight: normal;
//   font-size:1rem;
//   color:inherit;
//   text-decoration:none;
//   margin:20px 0px 20px 0px;
//   height:2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align:start;
// `;

// const ProductInfoBox = styled.div`
//   margin-top: 5px;
//   max-width:10rem;
//   display:flex;
//   flex-direction:column;
//   align-items:start;
//   text-align:start;
// `;

// const PriceRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content:center;
//   flex-direction:column;
//   height:100px;
//   @media screen and (min-width: 768px) {
//     display: flex;
//   }
// `;

// const Price = styled.div`
//   font-size: 1rem;
//   font-weight:400;
//   text-align: right;
//   height:2rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//     margin-top:10px;
//   @media screen and (min-width: 768px) {
//     font-size:18px;
//     font-weight:600;
//     text-align: center;
//   }
// `;

// const WishlistButton = styled.button`
//   border:0;
//   width: 40px !important;
//   height: 40px;
//   padding: 10px;
//   position: absolute;
//   top:0;
//   right:0;
//   background:transparent;
//   cursor: pointer;
//   ${props => props.wished ? `
//     color:red;
//   ` : `
//     color:black;
//   `}
//   svg{
//     width: 16px;
//   }
// `;

// export default function ProductBox({
//   _id, title, description, price, images, wished = false,
//   onRemoveFromWishlist = () => { },
// }) {
//   const url = '/product/' + _id;
//   const [isWished, setIsWished] = useState(wished);
//   function addToWishlist(ev) {
//     ev.preventDefault();
//     ev.stopPropagation();
//     const nextValue = !isWished;
//     if (nextValue === false && onRemoveFromWishlist) {
//       onRemoveFromWishlist(_id);
//     }
//     axios.post('/api/wishlist', {
//       product: _id,
//     }).then(() => { });
//     setIsWished(nextValue);
//   }
//   return (
//     <ProductWrapper>
//       <WhiteBox href={url}>
//         <div>
//           {/* <WishlistButton wished={isWished} onClick={addToWishlist}>
//             {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
//           </WishlistButton> */}
//           <img src={images?.[0]} alt="" />
//         </div>
//       </WhiteBox>
//       <ProductInfoBox>
//         <Title href={url}>{title}</Title>
//         <PriceRow>
//           <Price>
//             {price} RON
//           </Price>
//           {/* <FlyingButton main _id={_id} src={images?.[0]}>Adaugă în coș</FlyingButton> */}
//         </PriceRow>
//       </ProductInfoBox>
//     </ProductWrapper>
//   );
// }

