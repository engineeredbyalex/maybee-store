import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Basic/Button";
import Header from "@/components/Basic/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import Page from "@/components/Layout/Page";
import Container from "@/components/Layout/Container";

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
        router.push("/account"); 
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
    return (
      <>
        <Banner />
        <Header />
        <Page>
          <Container>
            <div className=" mt-[1rem] w-full mb-[10rem] flex flex-row items-center justify-center">
              <div className=" w-full flex flex-col items-center justify-center">
                <div className="w-full text-[#000] flex flex-col items-center justify-center ">
                  <h3 className="uppercase">Bună {session.user?.name}</h3>
                  <h4>
                    În acest panou de control al contului tău poţi accesa{" "}
                    <span>
                      <Link className="underline" href="/orders">
                        comenzile recente
                      </Link>
                    </span>
                    , să îţi administrezi{" "}
                    <span>
                      <Link className="underline" href="/address">
                        adresele de livrare şi de facturare
                      </Link>
                    </span>{" "}
                    şi{" "}
                    <span>
                      <Link className="underline" href="/details">
                        să îţi editezi parola şi detaliile contului.
                      </Link>
                    </span>
                  </h4>
                </div>
                <div className="flex w-full text-left mt-10 text-[#000]">
                  <ul>
                    <li className="underline list-disc">
                      <Link href="/orders">
                        <h4>Comenzile recente</h4>
                      </Link>
                    </li>
                    <li className="underline list-disc">
                      <p onClick={logout}>
                        <h4>Deconectează-te</h4>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Page>
      </>
    );
  }

  return (
    <div>
      <Banner />
      <Header />
      <Page>
        <Container>
          <h5 className="text-[#595959] mt-[1rem] mb-[0.5rem]">Conectare</h5>
          <Link className="" href="/register">
            <p className="text-[#595959] underline underline-offset-4 underline-[#595959]">
              Crează un cont
            </p>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-sfull"
          >
            <div className="w-[100%] mb-4 flex flex-col ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full py-2 px-3 appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                Parola
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola"
              />
            </div>
            <div className="flex items-center justify-start  w-full">
              <button type="submit">Conectare</button>

            </div>
            {error && (
              <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
          </form>
        </Container>
      </Page>
    </div>
  );
};

export default AccountPage;
