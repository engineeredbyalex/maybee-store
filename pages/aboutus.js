import React from "react";
import Header from "@/components/Basic/Header";
import Center from "@/components/Layout/Center";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";

export default function AboutUsPage() {
    return (
        <>
            <Banner />
            <Header />
            <Center>
                <div className="w-full flex  text-5xl mt-[10rem] font-normal text-uppercase mb-5">Despre noi</div>
            </Center>
            <div className="flex items-center justify-center text-center min-h-screen">
                <Center>

                        <p className="mt-4 text-2xl">
                            MAYBEE a fost înființată în 2023 la încurajarea și susținerea persoanelor apropiate, care au încercat și
                            validat produsele noastre și au fost încântate de fiecare detaliu. Ne mândrim cu faptul că aducem bucurie și
                            frumusețe în casele clienților noștri prin produse de calitate și design unic.
                        </p>

                        <p className="mt-4 text-2xl">
                            Ceea ce facem noi? Turnăm manual săpunuri, lumânări și ceară parfumată, personalizăm parfumurile. Ne implicăm cu pasiune în găsirea celor mai frumoase
                            variante de ambalare, astfel încât să te simți special/ă chiar din momentul în care primești pachetul nostru.
                        </p>

                        <p className="mt-4 text-2xl">
                            Toate lumânările, ceara și săpunurile noastre sunt 100% naturale, fabricate din produse bio. Parfumurile sunt
                            creații exclusiv MAYBEE, alese și testate cu atenție. Acestea sunt formulate cu uleiuri esențiale bio și se
                            bazează pe combinații de note de vârf, mijloc și bază, incluzând de la patru până la șase arome care se
                            completează în mod excelent.
                        </p>

                        <p className="mt-4 text-2xl">
                            Ne dorim ca MAYBEE să fie un brand cât mai personal și mai aproape de tine.
                        </p>

                </Center>
            </div>
            <Footer />
        </>
    );
}
