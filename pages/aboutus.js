import React from "react";
import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";

const AboutUsPage = () => {
  return (
    <div className="overflow-hidden">
      <Banner />
      <Header />
      <Layout>
        <div className="w-full flex flex-col items-start justify-center mt-[5rem]">
          <h4 className="mb-5 text-left w-full">Despre Noi</h4>
          <div className="w-full text-[#000] text-left  gap-5 mb-10 flex flex-col items-start justify-center">
            <AboutUsParagraph>
              MAYBEE a fost înființată în 2023 la încurajarea și susținerea persoanelor apropiate, care au încercat și validat produsele noastre și au fost încântate de fiecare detaliu. Ne mândrim cu faptul că aducem bucurie și frumusețe în casele clienților noștri prin produse de calitate și design unic.
            </AboutUsParagraph>
            <AboutUsParagraph>
              Ceea ce facem noi? Turnăm manual săpunuri, lumânări și ceară parfumată, personalizăm parfumurile. Ne implicăm cu pasiune în găsirea celor mai frumoase variante de ambalare, astfel încât să te simți special/ă chiar din momentul în care primești pachetul nostru.
            </AboutUsParagraph>
            <AboutUsParagraph>
              Toate lumânările, ceara și săpunurile noastre sunt 100% naturale, fabricate din produse bio. Parfumurile sunt creații exclusiv MAYBEE, alese și testate cu atenție. Acestea sunt formulate cu uleiuri esențiale bio și se bazează pe combinații de note de vârf, mijloc și bază, incluzând de la patru până la șase arome care se completează în mod excelent.
            </AboutUsParagraph>
            <AboutUsParagraph>
              Ne dorim ca MAYBEE să fie un brand cât mai personal și mai aproape de tine.
            </AboutUsParagraph>
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

const AboutUsParagraph = ({ children }) => (
  <p className="mb-4">
    {children}
  </p>
);

export default AboutUsPage;
