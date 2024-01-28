import Banner from "@/components/Basic/Navigation/Banner";
import Header from "@/components/Basic/Navigation/Header";
import { BigSpacer } from "@/components/Layout/Spacer";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";

export default function AboutUsPage() {
    return (
        <div>
            <Banner />
            <Header />
            <Layout>
                <div className="flex w-full h-full flex-col items-center justify-center">
                    <div className="w-full flex lg:justify-center items-center mt-[15rem]  text-[#595959] font-bold">
                        <h4 className="text-uppercase">
                            Despre noi
                        </h4>
                    </div>
                    <BigSpacer>
                        <div className="flex flex-col items-center justify-center lg:text-center  text-[#595959] font-semibold gap-10">
                            <p>
                                MAYBEE a fost înființată în 2023 la încurajarea și susținerea persoanelor apropiate, care au încercat și
                                validat produsele noastre și au fost încântate de fiecare detaliu. Ne mândrim cu faptul că aducem bucurie și
                                frumusețe în casele clienților noștri prin produse de calitate și design unic.
                            </p>
                            <p >
                                Ceea ce facem noi? Turnăm manual săpunuri, lumânări și ceară parfumată, personalizăm parfumurile. Ne implicăm cu pasiune în găsirea celor mai frumoase
                                variante de ambalare, astfel încât să te simți special/ă chiar din momentul în care primești pachetul nostru.
                            </p>
                            <p >
                                Toate lumânările, ceara și săpunurile noastre sunt 100% naturale, fabricate din produse bio. Parfumurile sunt
                                creații exclusiv MAYBEE, alese și testate cu atenție. Acestea sunt formulate cu uleiuri esențiale bio și se
                                bazează pe combinații de note de vârf, mijloc și bază, incluzând de la patru până la șase arome care se
                                completează în mod excelent.
                            </p>
                            <p >
                                Ne dorim ca MAYBEE să fie un brand cât mai personal și mai aproape de tine.
                            </p>
                        </div>
                    </BigSpacer>
                </div>
            </Layout>
            <div className="mt-[30px] lg:mt-[60px]">
                <Footer />
            </div>
        </div>
    );
}
