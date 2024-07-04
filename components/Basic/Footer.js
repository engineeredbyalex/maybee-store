
import Image from "next/image";
import Link from "next/link";
import logo2 from "@/public/images/logo2.png"
import logo3 from "@/public/images/logo3.webp"

export default function Footer() {
    return (
        <div className="w-screen h-auto pt-12 gap-4 bg-white  flex items-center justify-center flex-col overflow-hidden">
            <div className="w-full h-full gap-4 flex items-center justify-center flex-col lg:flex-row ">
                <div className="w-full lg:w-1/4 h-auto gap-4 flex items-center justify-center flex-col">
                    <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank">
                        <Image width={200} height={200} src={logo2} alt="logo" />
                    </a>
                    <a href="https://anpc.ro/ce-este-sal/" target="_blank">
                        <Image width={200} height={200} src={logo3} alt="logo" />
                    </a>
                </div>
                <div className="w-full lg:w-1/4 h-auto gap-2 flex flex-col items-center lg:items-start justify-center">
                    <p className="font-normal text-black">
                        Customer Service
                    </p>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            Contact Us
                        </p>
                    </Link>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            Shipping & Returns
                        </p>
                    </Link>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            FAQ
                        </p>
                    </Link>
                </div>
                <div className="w-full lg:w-1/4 h-auto gap-2 flex flex-col items-center lg:items-start justify-center">
                    <p className="font-normal text-black">
                        About Us
                    </p>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            Our Story
                        </p>
                    </Link>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            Carreres
                        </p>
                    </Link>
                    <Link href={'/'}>
                        <p className="font-light text-gray-600">
                            Press
                        </p>
                    </Link>
                </div>
               
                <div className="w-full lg:w-1/4 h-auto gap-2 flex flex-col items-center lg:items-start justify-center" >
                    <p className="font-medium uppercase"> contact</p>
                    <p className=" font-light text-gray-600">Maybee</p>
                    <p className=" font-light text-gray-600">mixedarts.events@gmail.com</p>
                    <p className=" font-light text-gray-600">Mixed Arts Events SRL</p>
                    <p className=" font-light text-gray-600">CUI : 38795036</p>
                    <p className=" font-light text-gray-600">Adresă : Timișoara, jud Timiș</p>
                    </div>
              
            </div>
            <div className="w-full py-3 flex items-center justify-center flex-col bg-black text-[#fff]">
                <p className="font-light">CONSTRUIT DE :</p>
                <Link target="_blank" href="https://www.alexlazarescu.com/" className="text-[#fff] font-normal"><p>auraagency.eu</p></Link>
            </div>
</div>
    );
}

