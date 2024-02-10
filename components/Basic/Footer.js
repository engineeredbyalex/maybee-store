
import Image from "next/image";
import Link from "next/link";
import logo2 from "@/public/images/logo2.png"
import logo3 from "@/public/images/logo3.webp"

export default function Footer() {
    return (
        <div className=" h-auto w-full flex flex-col items-center justify-center bg-[#bebbaa] text-[#FDFCEA]">
            <div className="flex flex-col lg:flex-row items-center justify-center  w-full text-center h-auto py-5">
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-start h-auto py-3 gap-2">
                    <div><p className="font-bold uppercase">Link-uri utile</p></div>
                    <Link href={'/aboutus'}><p className=" hover:text-[#DB572E] transition-all ease-in-out">Despre noi</p></Link>
                    <Link href={'/policy'}>  <p className=" hover:text-[#DB572E] transition-all ease-in-out">Termeni și condiții</p></Link>
                    <Link href={'/policy'}> <p className=" hover:text-[#DB572E] transition-all ease-in-out">Politica de Confidențialitate și Prelucrare a Datelor cu Caracter Personal</p></Link>
                    {/* <Link href={'/'}>  <p className=" hover:text-[#DB572E] transition-all ease-in-out"> Politica de cookies</p></Link> */}
                </div>

                <div className="w-full lg:w-1/3 flex flex-col items-center justify-start h-auto py-3 gap-2">
                    <div><p className="font-bold uppercase">În magazin</p></div>
                    <Link href={'/account'}><p className=" hover:text-[#DB572E] transition-all ease-in-out">Contul meu</p></Link>
                    <Link href={'/products'}> <p className=" hover:text-[#DB572E] transition-all ease-in-out">Produse noi</p></Link>
                    {/* <Link href={'/'}><p className=" hover:text-[#DB572E] transition-all ease-in-out">Harta site-ului</p></Link> */}
                </div>
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-start h-auto py-3 gap-2">
                    <div><p className="font-bold uppercase">Date contact</p></div>
                    <p className=" hover:text-[#DB572E] transition-all ease-in-out">Maybee</p>
                    <p className=" hover:text-[#DB572E] transition-all ease-in-out">mixedarts.events@gmail.com</p>
                    <p className=" hover:text-[#DB572E] transition-all ease-in-out">Mixed Arts Events SRL</p>
                    <p className=" hover:text-[#DB572E] transition-all ease-in-out">CUI : 38795036</p>
                    <p className=" hover:text-[#DB572E] transition-all ease-in-out">Adresă : Timișoara, jud Timiș</p>
                </div>
            </div>

            <div className="w-full flex items-center justify-center flex-col lg:flex-row gap-5 mb-5">
                <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank">
                    <Image width={200} height={200} src={logo2} />
                </a>
                <a href="https://anpc.ro/ce-este-sal/" target="_blank">
                    <Image width={200} height={200} src={logo3} />
                </a>
            </div>
            <div className="w-full flex items-center justify-center flex-col bg-black text-[#FDFCEA]">
                <p>CONSTRUIT DE :</p>
                <Link target="_blank" href="https://www.alexlazarescu.com/" className="text-[#FDFCEA]">alexlazarescu.com</Link>
            </div>
        </div>
    );
}

