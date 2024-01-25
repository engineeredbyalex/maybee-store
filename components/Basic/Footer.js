
import logoSmall from '@/public/images/logoSmall.png';
import Image from "next/image";
import ANPC_ONE from '@/public/images/logo1.png';
import ANPC_TWO from '@/public/images/anpc-sol.webp';
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-gray-300 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-8">
                <div className="flex flex-col justify-between items-center">
                    <Image width={70} src={logoSmall} alt="logo" />
                    <p>Email : mixedarts.events@gmail.com</p>
                    <p>Mixed Arts Events SRL</p>
                    <p>CUI : 38795036</p>
                    <p>Adresă : Timișoara, jud Timiș</p>
                </div>
                <div className="flex flex-col justify-between items-center mt-4 lg:mt-0">
                    <h2 className="font-light text-2xl">Întrebări puse frecvent</h2>
                    <Link href="/faq"><p className="text-blue-700">Procesul de livrare</p></Link>
                    <Link href="/faq"><p className="text-blue-700">Procesul de fabricație</p></Link>
                    <Link href="/faq"><p className="text-blue-700">Procesarea datelor</p></Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-8">
                <div className="flex flex-col items-center">
                    <Image alt="" width={150} src={ANPC_ONE} />
                    <Link href="https://anpc.ro/ce-este-sal" target="_blank">
                        <p className="text-blue-700">https://anpc.ro/ce-este-sal/</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center mt-4 lg:mt-0">
                    <Image alt="" width={150} src={ANPC_TWO} />
                    <Link href="https://ec.europa.eu/consumers/odr/main/?event=main.home2.show" target="_blank">
                        <p className="text-blue-700">https://ec.europa.eu/consumers/odr/main/?event=main.home2.show</p>
                    </Link>
                </div>
            </div>
            <div className="bg-black text-white flex items-center justify-center flex-col p-3">
                <p>CONSTRUIT DE :</p>
                <Link target="_blank" href="https://www.alexlazarescu.com/" className="text-blue-700">alexlazarescu.com</Link>
            </div>
        </div>
    );
}
