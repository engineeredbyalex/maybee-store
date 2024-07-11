import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Layout from "../Layout/Layout";
import Button from "../Basic/Button";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-10">
      <Layout>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className=" font-semibold text-black mb-6">Despre noi</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              MAYBEE a fost înființată în 2023 și creează manual produse precum săpunuri, lumânări și ceară parfumată.
              Ne specializăm în parfumuri personalizate și ambalaje frumoase pentru a aduce un sentiment special clienților noștri.
              Toate produsele noastre sunt 100% naturale și bazate pe uleiuri esențiale bio, combinate armonios pentru a oferi o experiență deosebită.
              Vrem ca MAYBEE să fie un brand personal și dedicat ție.
            </p>
            <div className="mt-8">
              <Link href="/aboutus" passHref>
                <Button variant="solid_dark">
                  <h5 className="uppercase text-lg">Află mai multe</h5>
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-end">
            <div className="w-[18rem] h-[16rem] xl:w-[30rem] xl:h-[24rem] relative">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/maybee-store.appspot.com/o/images%2FIMG-20240709-WA0005.jpg?alt=media&token=49fecde3-b27f-4af0-98f5-a2f3449acc47"
                alt="MAYBEE Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
