import Image from "next/image";
import Link from "next/link";
import logo2 from "@/public/images/logo2.png";
import logo3 from "@/public/images/logo3.webp";
import LogoSvg from "../../public/images/Logo.svg";
import Layout from "../Layout/Layout";

export default function Footer() {
    return (
        <div className="w-full bg-white flex flex-col items-center justify-center overflow-hidden pt-12">
            <div className="w-full grid gap-8 px-4 sm:px-8 md:px-16 lg:grid-cols-2 xl:grid-cols-4">
                <div className="flex flex-col items-center lg:items-start">
                    <LogoSvg className="w-16 h-16 svg_icon mb-4" />
                    <div className="flex flex-col items-center lg:items-start space-y-4">
                        <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer">
                            <Image width={200} height={200} src={logo2} alt="logo" />
                        </a>
                        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                            <Image width={200} height={200} src={logo3} alt="logo" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="font-medium uppercase mb-2">Contact</p>
                    <p className="font-light text-gray-600">Maybee</p>
                    <p className="font-light text-gray-600">mixedarts.events@gmail.com</p>
                    <p className="font-light text-gray-600">Mixed Arts Events SRL</p>
                    <p className="font-light text-gray-600">CUI : 38795036</p>
                    <p className="font-light text-gray-600">Adresă : Timișoara, jud Timiș</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="font-medium uppercase mb-2">Customer Service</p>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">Contact Us</p>
                    </Link>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">Shipping & Returns</p>
                    </Link>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">FAQ</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="font-medium uppercase mb-2">About Us</p>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">Our Story</p>
                    </Link>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">Careers</p>
                    </Link>
                    <Link href="/">
                        <p className="font-light text-gray-600 mb-2">Press</p>
                    </Link>
                </div>
            </div>
            <div className="w-full mt-5 flex flex-col items-center justify-center bg-black text-white">
                <p className="font-light">CONSTRUIT DE :</p>
                <Link href="auraagency.eu" target="_blank" rel="noopener noreferrer" className="font-normal">
                    <p>auraagency.eu</p>
                </Link>
            </div>
        </div>
    );
}
