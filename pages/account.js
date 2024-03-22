import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Basic/Button";
import Header from "@/components/Basic/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";

const AccountPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');


  async function logout() {
    await signOut('credentials')
  }
  async function login() {
    await signIn('google');
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
        setError("Invalid Credentials");
      } else {
        router.push("/"); 
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setError("An error occurred during login");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    if (session) {
      return (
        <>
          <Header />
          <Layout>
            <div className="mt-[10rem] flex flex-row items-center justify-center w-full mb-[10rem]">
              <div className=" flex flex-col items-center justify-center w-full">
                <div className="w-full flex flex-col items-center justify-center text-[#595959]">
                  <h3 className="uppercase ">Bună {session.user.name}</h3>
                  <h4>
                    În acest panou de control al contului tău poţi accesa <span ><Link className="underline" href="/orders">comenzile recente</Link></span>, să îţi administrezi <span ><Link className="underline" href="/address">adresele de livrare şi de facturare</Link></span>  Èi <span ><Link className="underline" href="/details">să îţi editezi parola şi detaliile contului.</Link></span>
                  </h4>
                </div>
                <div className="flex w-full text-left mt-10 text-[#595959]">
                  <ul>
                    <li className="underline list-disc">
                      <Link href='/orders'><h4>Comenzile recente</h4></Link>
                    </li>
                    <li className="underline list-disc">
                      <Link href='/'><h4>Adresele de livrare şi de facturare</h4></Link>
                    </li>
                    <li className="underline list-disc">
                      <Link href='/'><h4>Comenzile recente</h4></Link>
                    </li>
                    <li className="underline list-disc">
                      <p onClick={() => logout()} href='/'><h4>Deconectează-te</h4></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Layout>
          <Footer />
        </>
      );
    }
  }

  return (
    <div>
      <Header />
      <div className="mt-[10rem] flex flex-col items-center justify-center">
        <h4 className="uppercase font-bold text-[#595959]">
          Autentificare
        </h4>
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto  shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Parola
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parola"
            />
          </div>
          <div className="flex items-center justify-between flex-col gap-5 w-full">
            <Button

              type="submit"
            >
              Conectare
            </Button>
            <Button

              type="submit"
            >
              <Link href='/register'>
                Inregistrare
              </Link>
            </Button>
          </div>

          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
