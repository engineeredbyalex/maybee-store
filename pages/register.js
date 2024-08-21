import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/basic/Header";
import Page from "@/components/layout/Page";
import Banner from "@/components/basic/Banner";
import Container from "@/components/Layout/Container";
import Footer from "@/components/basic/Footer";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      // Check if user already exists
      const resUserExists = await axios.post("/api/userExists", { email });

      if (resUserExists.data.user) {
        setError("User already exists.");
        return;
      }

      // Register user if user doesn't exist
      const resRegister = await axios.post("/api/register", { name, email, password });

      if (resRegister.status === 201) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="w-full">
      <Banner />
      <Header />
      <Page>
        <Container className="w-full">
          <h5 className="text-[#000] mt-[5rem] mb-[0.5rem]">Înregistrare</h5>
          <Link className="" href="/account">
            <p className="text-[#000] underline underline-offset-4 underline-[#000]">
              Conectare
            </p>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full flex flex-col items-start justify-center"
          >
            <div className="w-full mb-4 flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nume şi prenume
              </label>
              <input
                className="w-full py-2 px-3 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nume şi prenume"
              />
            </div>
            <div className="w-full mb-4 flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full py-2 px-3 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="w-full mb-6 flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Parola
              </label>
              <input
                className="w-full py-2 px-3 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola"
              />
            </div>
            <div className="w-full flex items-center justify-start">
              <button className="w-full flex items-center justify-center bg-black text-white px-4 py-2 rounded-md transition-colors duration-500" type="submit">
                <p>Crează cont</p>
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
          </form>
        </Container>
      </Page>
      <Footer />
    </div>
  );
}
