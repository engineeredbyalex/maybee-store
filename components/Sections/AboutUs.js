import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Layout from "../Layout/Layout";
import Button from "../Basic/Button";

export default function AboutUs() {
  return (
    <div className="py-12 ">
      <Layout>
        <div className="flex flex-col gap-6 text-left">
          <h2 className="font-semibold uppercase">Despre noi</h2>
            <div className="flex flex-col gap-5">
              <h5 className="text-[#000] ">
                MAYBEE, infiintată în 2023, creează manual produse precum sapunuri, lumanari si ceara parfumata. <br /> Ne specializăm în parfumuri personalizate și impachetari frumoase pentru a-ti aduce un sentiment special. <br /> Toate produsele noastre sunt 100% naturale și bazate pe uleiuri esentiale bio, combinate armonios pentru a-ti oferi o experiență deosebita. <br /> Vrem ca MAYBEE să fie un brand personal, dedicat ție.
              </h5>
                <Button variant="solid_dark">
                  <Link href="/aboutus" passHref>
                    <h5 className="uppercase">
                      Află mai multe
                    </h5>
                  </Link>
                </Button>
            </div>
          </div>
      </Layout>
    </div>
  );
}
