import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { RevealWrapper } from "next-reveal";
import Wrapper from "../Layout/Wrapper";
import Center from "../Layout/Center";

export default function AboutUs() {
  return (
    <div className="flex items-center justify-center py-16 h-auto flex-col lg:flex-row">
      <Wrapper>
        <Center>
          <div className="flex flex-col max-w-[500px]  text-center lg:text-center">
            <RevealWrapper>
              <h2 className="text-2xl font-bold mb-5">Despre MAYBEE</h2>
            </RevealWrapper>
            <RevealWrapper>
              <p className="text-[18px] leading-6 text-black">
                MAYBEE, infiintată în 2023, creează manual produse precum sapunuri, lumanari si ceara parfumata. <br /> Ne specializăm în parfumuri personalizate și impachetari frumoase pentru a-ti aduce un sentiment special. <br /> Toate produsele noastre sunt 100% naturale și bazate pe uleiuri esentiale bio, combinate armonios pentru a-ti oferi o experiență deosebita. <br /> Vrem ca MAYBEE să fie un brand personal, dedicat ție.
              </p>
            </RevealWrapper>
            <RevealWrapper>
              <div className="my-5">
                <Link href="/aboutus" passHref>
                  <p className="inline-block px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition duration-500 ease-in-out transform hover:scale-105">
                    Află mai multe
                  </p>
                </Link>
              </div>
            </RevealWrapper>
            <RevealWrapper>
              <div className="flex justify-center gap-[30px]">
                <SocialIcon
                  bgColor="#000"
                  url="https://www.facebook.com/maybee.for.your.home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition duration-500 ease-in-out hover:scale-105"
                />
                <SocialIcon
                  bgColor="#000"
                  url="https://www.instagram.com/maybee.candle.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </RevealWrapper>
          </div>
        </Center>
      </Wrapper>
    </div>
  );
}
