import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/Basic/Button";
import Header from "@/components/Basic/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Basic/Footer";

const AccountPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error,setError] = useState([])


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
        setError("Date invalide");
      } else {
        router.push("/account"); // Redirect to dashboard upon successful login
      }
    } catch (error) {
      console.log("Error during login: ", error);
      setError("A apărut o problemă la conectare.");
    }
  };

  if (status === "loading") {
    return <div>Se încarcă...</div>;
  }

  if (session) {
    return (
      <>
        <Header />
       <Layout>
         <div className="mt-[10rem] flex flex-row items-center justify-center w-full mb-[10rem]">
          <div className=" flex flex-col items-center justify-center w-full">
            <div className="w-full flex flex-col items-center justify-center text-[#595959]">
              <h3 className="uppercase ">Bună {session.user.name} (nu ești {session.user.name} <span ><button className="underline uppercase" onClick={() => logout()}>Deconectează-te</button></span>)</h3>
              <h4>
                  În acest panou de control al contului tău poți accesa <span ><Link className="underline" href="/orders">comenzile recente</Link></span>, să-ți administrezi <span ><Link className="underline" href="/address">adresele de livrare și de facturare</Link></span>  și <span ><Link className="underline" href="/details">să-ți editezi parola și detaliile contului.</Link></span> 
              </h4>
            </div>
            <div className="flex w-full text-left mt-10 text-[#595959]">
              <ul>
                <li className="underline list-disc">
                  <Link href='/'><h4>Comenzile recente</h4></Link>
                </li>
                <li className="underline list-disc">
                  <Link href='/'><h4>Adresele de livrare și de facturare</h4></Link>
                </li>
                <li className="underline list-disc">
                  <Link href='/'><h4>Comenzile recente</h4></Link>
                </li>
                  <li className="underline list-disc">
                    <Link href='/'><h4>Deconectează-te</h4></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </Layout>
        <Footer/>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="mt-[10rem] flex flex-col items-center justify-center">
        <h5 className="uppercase font-bold text-[#595959]">
          Autentificare
        </h5>
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email || ''}
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

