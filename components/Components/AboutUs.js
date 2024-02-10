import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Layout from "../Layout/Layout";
import { SmallSpacer } from "../Layout/Spacer";
import Button from "../Basic/Button";

export default function AboutUs() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <Layout>
        <div className="flex flex-col text-center lg:text-center w-full">
          <SmallSpacer>
            <h3 className="text-[#595959] font-bold mb-5">Despre MAYBEE</h3>
          </SmallSpacer>
          <SmallSpacer>
            <div className="w-2/3">
              <p className=" text-[#595959]">
                MAYBEE, infiintată în 2023, creează manual produse precum sapunuri, lumanari si ceara parfumata. <br /> Ne specializăm în parfumuri personalizate și impachetari frumoase pentru a-ti aduce un sentiment special. <br /> Toate produsele noastre sunt 100% naturale și bazate pe uleiuri esentiale bio, combinate armonios pentru a-ti oferi o experiență deosebita. <br /> Vrem ca MAYBEE să fie un brand personal, dedicat ție.
              </p>
              <SmallSpacer>
                <Button solid primary>
                  <Link href="/aboutus" passHref>
                    <p className="uppercase">
                      Află mai multe
                    </p>
                  </Link>
                </Button>
              </SmallSpacer>
            </div>
          </SmallSpacer>
          <SmallSpacer>
            <div className="flex justify-center gap-[30px]">
              <SocialIcon
                bgColor="#595959"
                url="https://www.facebook.com/maybee.for.your.home"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition duration-500 ease-in-out hover:scale-105"
              />
              <SocialIcon
                bgColor="#595959"
                url="https://www.instagram.com/maybee.candle.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </SmallSpacer>
          </div>
      </Layout>
    </div>
  );
}
