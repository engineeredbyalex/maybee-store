import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "@/components/basic/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "@/components/basic/Footer";
import Banner from "@/components/basic/Banner";
import Page from "@/components/layout/Page";
import Layout from "@/components/layout/Layout";

const AccountPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');

  async function logout() {
    await signOut('credentials');
  }


  useEffect(() => {
    if (!session) {
      return;
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Datele introduse sunt greşite.");
      } else {
        router.push("/account");
      }
    } catch (error) {
      console.error("A apărut o eroare în timpul conectării:", error);
      setError("A apărut o eroare în timpul conectării!");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        <Banner />
        <Header />
        <div className="mt-[5rem]">
          <Layout>
            <div className=" w-full flex flex-col items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center text-left bg-white p-8 rounded-lg shadow-md">
                <h3 className="mb-4">Bună, {session.user?.name}</h3>
                <h5 className="mb-8 ">
                  În acest panou de control al contului tău poţi accesa{" "}
                  
                    comenzile recente
                
                  , să îţi administrezi{" "}
                 
                    adresele de livrare şi de facturare
                
                  şi
                 
                    să îţi editezi parola şi detaliile contului.
              
                </h5>
                <ul className="w-full flex flex-col items-start text-left space-y-4">
                  <li className="list-none">
                    <Link href="/orders">
                      <h4>Comenzile recente</h4>
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link href="/address">
                      <h4>Adresele de livrare şi de facturare</h4>
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link href="/details">
                      <h4>Editează parola şi detaliile contului</h4>
                    </Link>
                  </li>
                  <li className="list-none">
                    <button onClick={logout} className="focus:outline-none">
                      <h4>Deconectează-te</h4>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Layout>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <div>
      <Banner />
      <Header />
      <div className="mt-[5rem] mb-[5rem]">
        <Layout>
            <h5 className="text-[#000] mt-[1rem] mb-[0.5rem]">Conectare</h5>
     
            <form
              onSubmit={handleSubmit}
              className="mt-10 w-sfull"
            >
              <div className="w-[100%] mb-4 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  <p> Email</p>
                </label>
                <input
                  className="w-full py-2 px-3 appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  <p>Parolă</p>
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parola"
                />
              </div>
              <div >
                <button className="cartButton w-full flex items-center justify-center bg-black text-white px-4 py-2 rounded-md transition-colors duration-500" type="submit"><p>Conectare</p></button>

              </div>
              <Link className="w-full" href="/register">
                <p className="text-[#000] underline underline-offset-4 underline-[#000] mt-4">
                  Crează un cont
                </p>
              </Link>
              {error && (
                <p className="text-red-500 text-lg italic mt-4">{error}</p>
              )}
            </form>
        </Layout>
          </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
