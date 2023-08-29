import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import WhiteBox from "@/components/WhiteBox";

const AboutUsWrapper = styled.div`
    margin-top:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
`;

export default function AboutUsPage() {
    return (
        <>
            <Header />
            <AboutUsWrapper>
                <Center>
                    <WhiteBox>
                        <h2>Despre noi</h2>
                        <p>
                            MAYBEE a fost înființată în 2023 la încurajarea și susținerea persoanelor apropiate, care au încercat și
                            validat produsele noastre și au fost încântate de fiecare detaliu. Ne mândrim cu faptul că aducem bucurie și
                            frumusețe în casele clienților noștri prin produse de calitate și design unic.
                        </p>
                        <p>
                            Ceea ce facem noi? Turnăm manual săpunuri, lumânări și ceară parfumată, personalizăm parfumurile. Ne implicăm cu pasiune în găsirea celor mai frumoase
                            variante de ambalare, astfel încât să te simți special/ă chiar din momentul în care primești pachetul nostru.
                        </p>
                        <p>
                            Toate lumânările, ceara și săpunurile noastre sunt 100% naturale, fabricate din produse bio. Parfumurile sunt
                            creații exclusiv MAYBEE, alese și testate cu atenție. Acestea sunt formulate cu uleiuri esențiale bio și se
                            bazează pe combinații de note de vârf, mijloc și bază, incluzând de la patru până la șase arome care se
                            completează în mod excelent.
                        </p>
                        <p>
                            Ne dorim ca MAYBEE să fie un brand cât mai personal și mai aproape de tine. Te așteptăm cu drag să vizitezi
                            magazinul nostru online pe&nbsp;
                            <a href="https://www.maybee.ro" target="_blank" rel="noopener noreferrer">
                                www.maybee.ro
                            </a>
                            .
                        </p>
                    </WhiteBox>
                </Center>
            </AboutUsWrapper>
            <Footer />
        </>
    );
}
