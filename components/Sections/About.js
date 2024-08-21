import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Layout from "../layout/Layout";
import Button from "../ui/Button";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-[3.5rem]">
      <Layout>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left">
            <h3 className=" font-semibold text-black mb-[3.5rem]">Despre noi</h3>
            <p className="text-lg text-black leading-relaxed">
              MAYBEE a fost înființată în 2023 și creează manual produse precum săpunuri, lumânări și ceară parfumată.
              Ne specializăm în parfumuri personalizate și ambalaje frumoase pentru a aduce un sentiment special clienților noștri.
              Toate produsele noastre sunt 100% naturale și bazate pe uleiuri esențiale bio, combinate armonios pentru a oferi o experiență deosebită.
              Vrem ca MAYBEE să fie un brand personal și dedicat ție.
            </p>
            <div className="mt-8">
              <Link href="/aboutus" passHref>
                <Button variant="solid_dark">
                  <h5 className="uppercase">Află mai multe</h5>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
