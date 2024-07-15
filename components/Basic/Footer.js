import Image from "next/image";
import Link from "next/link";
import logo2 from "@/public/images/logo2.png";
import logo3 from "@/public/images/logo3.webp";
import LogoSvg from "../../public/images/Logo.svg";

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
                    <p className="font-medium  mb-2">Contact</p>
                    <p className="font-light text-gray-600">Maybee</p>
                    <p className="font-light text-gray-600">mixedarts.events@gmail.com</p>
                    <p className="font-light text-gray-600">Mixed Arts Events SRL</p>
                    <p className="font-light text-gray-600">CUI: 38795036</p>
                    <p className="font-light text-gray-600">Adresă: Timișoara, jud Timiș</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="font-medium  mb-2">Servicii Clienți</p>
                    {/* <Link href="/contact">
                        <p className="font-light text-gray-600 mb-2">Contactați-ne</p>
                    </Link>
                    <Link href="/shippingandreturns">
                        <p className="font-light text-gray-600 mb-2">Livrare & Retururi</p>
                    </Link> */}
                    <Link href="/faq">
                        <p className="font-light text-gray-600 mb-2">Întrebări frecvente</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="font-medium  mb-2">Despre Noi</p>
                    <Link href="/aboutus">
                        <p className="font-light text-gray-600 mb-2">Povestea Noastră</p>
                    </Link>
                </div>
            </div>
            <div className="w-full py-2 mt-5 flex flex-col items-center justify-center bg-black text-white">
                <p className="font-light">CONSTRUIT DE:</p>
                <Link href="auraagency.eu" target="_blank" rel="noopener noreferrer" className="font-normal">
                    <p>auraagency.eu</p>
                </Link>
            </div>
        </div>
    );
}
