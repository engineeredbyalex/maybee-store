import Header from "@/components/Basic/Header";
import styled from "styled-components";
import Center from "@/components/Layout/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import Title from "@/components/Basic/Title";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import Wrapper from "@/components/Layout/Wrapper";
import { RevealWrapper } from "next-reveal";

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <Center>
        <RevealWrapper>
          <div className="w-full flex items-center justify-start text-5xl mt-[5rem] font-normal text-uppercase mb-5">Toate produsele</div>
        </RevealWrapper>
      </Center>
      <div className="mt-[10rem]">
        <Center>
          <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </Center>
      </div>


    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session?.user.email,
      product: products.map(p => p._id.toString()),
    })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    }
  };
}