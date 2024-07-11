import React from 'react';
import Link from "next/link";
import Image from "next/image";
import Button from "../Basic/Button";

export default function Landing() {
  return (
    <div className='w-screen h-[40rem] mt-[72px] relative'>
      <div className='w-full h-full gap-5 flex flex-col lg:flex-row px-0 md:px-[2rem] lg:px-[2.5rem]'>
        <div className='w-full xl:w-1/2 h-full text-left flex flex-col items-start justify-center gap-5 z-10 relative'>
          <h2 className="text-white lg:text-black font-bold px-[1.5rem] lg:px-0">
            Lumânări parfumate create <br /> cu grijă şi atenţie
          </h2>
          <div className='w-full px-[1.5rem] lg:px-0'>
            <Button variant="solid_dark">
              <Link href="/aboutus" passHref>
                <h5 className="uppercase">Cumpără acum</h5>
              </Link>
            </Button>
          </div>
        </div>
        <div className='w-full xl:w-1/2 xl:h-[40rem] absolute inset-0 lg:relative '>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2FFree_Candle_Mockup_3.png?alt=media&token=5783c6a9-b718-41b5-afb3-0cb1b7dc6d78" // Update with the correct image path
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            className="z-0 xl:rounded-xl "
          />
        </div>
      </div>
    </div>
  );
}
