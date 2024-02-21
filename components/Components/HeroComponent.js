import { Setting } from "@/models/Setting";
import Button from "../Basic/Button";
import Link from "next/link";

export default function MainHeader({ product }) {

  return (
    <div className="min-h-screen flex items-center justify-center flex-col mt-[5rem] lg:mt-[0rem]">
      <p className="text-[#595959] text-center leading-[1.8rem]">
        CREAT CU GRIJĂ  ȘI ATENȚIE
      </p>
      <div className="w-full flex  flex-col items-center justify-center mt-10 text-center">
        <h5 className="text-[#595959] leading-[2.5rem] w-3/4 uppercase font-bold">
          {product.title}
        </h5>
        <img className="w-auto max-h-[300px] mt-10" src={product.images?.[0]} alt={product.title} />
        <div className="mt-5">
          <Link href={'/product/' + product._id}>
            <Button >
              <p className="uppercase">Vezi produsul</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({ name: 'featuredProductId' });
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
      userEmail: session.user.email,
      product: newProducts.map(p => p._id.toString()),
    })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}