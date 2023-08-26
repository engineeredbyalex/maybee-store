import Header from "@/components/Header";
import Center from "@/components/Center";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import Footer from "@/components/Footer";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    display:flex;
    align-items:center;
    justify-content:start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display:flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
display:flex;
align-items:center;
justify-content:center;
border:solid 1px #000;
color:#000;
text-decoration:none;
height:3rem;
width:10rem;
margin-bottom:30px;
margin-top:10px;
border-radius:5px;
background: linear-gradient(to right, black 50%, transparent 50%);
background-size: 200% 100%;
background-position: right bottom;
transition: all .5s ease-out;

:hover {
  background-position: left bottom;
  color:#fff;
}
`;
const ShowAllLink = styled(Link)`
text-decoration:none;
padding:5px;
border-radius:10px;
border:1px solid;
`

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts = [] }) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map(cat => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <ShowAllLink href={'/category/' + cat._id}>Arată toate</ShowAllLink>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p, index) => (
                <RevealWrapper key={p._id} delay={index * 50}>
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                </RevealWrapper>
              ))}
              {/* <RevealWrapper delay={categoriesProducts[cat._id].length * 50}>
                <ShowAllSquare href={'/category/' + cat._id}>
                  Arată toate produsele
                </ShowAllSquare>
              </RevealWrapper> */}
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter(c => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter(c => c?.parent?.toString() === mainCatId)
      .map(c => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, { limit: 3, sort: { '_id': -1 } });
    allFetchedProductsId.push(...products.map(p => p._id.toString()))
    categoriesProducts[mainCat._id] = products;
  }


  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session?.user.email,
      product: allFetchedProductsId,
    })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(mainCategories)
      ),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}