import {
  HiOutlineTruck,
  HiOutlineGift,
  HiOutlineShoppingBag,
} from "react-icons/hi";

export default function OrderProcess() {
  return (
    <div className="h-auto w-auto px-5 lg:px-10 gap-10 lg:gap-14 mt-10 lg:mt-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full gap-4 flex flex-col items-start justify-center">
        <h3 className="">Procesul de comanda</h3>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-center">
        <div className="text-left lg:text-center flex flex-col items-start lg:items-center space-y-4">
          <HiOutlineShoppingBag color="#000" size={50} />
          <h3 className=" ">Alege produsul</h3>
          <h5 className=" ">
            Alege produsul din gama noastră variată de produse
          </h5>
        </div>
        <div className="text-left lg:text-center flex flex-col items-start lg:items-center space-y-4">
          <HiOutlineTruck color="#000" size={50} />
          <h3 className=" ">Livrare rapida</h3>
          <h5 className=" ">Produsul tău va fi livrat rapid și în siguranță</h5>
        </div>
        <div className="text-left lg:text-center flex flex-col items-start lg:items-center space-y-4">
          <HiOutlineGift color="#000" size={50} />
          <h3 className="">Cadou special</h3>
          <h5 className="">Bucură-te de un cadou special la fiecare comandă</h5>
        </div>
      </div>
    </div>
  );
}
