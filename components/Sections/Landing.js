// importing link
import { RevealWrapper } from "next-reveal";
// importing link
import HeroImage from '@/public/images/heroPhoto.jpg'
// importing link
import Button from "../Basic/Button";
// importing link
import Link from "next/link";
// importing Logo
import LogoSvg from "@/public/images/Logo.svg"
// importing Page
import Page from "../Layout/Page";

export default function Landing() {

  return (
    <Page>
      <h1 className="text-[#FDFCED] text-center mt-[10rem] uppercase font-bold absolute top-[25%]">
        Lumanari parfumate <br /> create cu grija si atentie
      </h1>
      <div className="hero_background" />
    </Page>
  );
}
