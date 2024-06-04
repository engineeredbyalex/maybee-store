import Banner from "@/components/Basic/Banner";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";

export default function AboutUsPage() {
  return (
    <div className="overflow-hidden">
      <Banner />
      <Header />
      <Layout>
        <div className="w-full flex items-start justify-center flex-col mt-[5rem]">
          <h4 className="mb-5">Toate produsele</h4>
                  <div className="w-full text-[#000] text-left font-semibold gap-10 mb-10 flex flex-col items-start justify-center">
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
                      <p className="">
                          Ne dorim ca MAYBEE să fie un brand cât mai personal și mai aproape de tine.
                      </p>
                  </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}
