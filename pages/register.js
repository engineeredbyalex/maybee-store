import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
    <div className="flex items-center justify-center h-screen w-full bg-[#FBFAFD] text-black">
      <div className="shadow-lg p-5 rounded-md bg-[#fff] min-w-[300px] min-h-[400px]">
        <p className="my-5">
          Register to <span className="font-bold uppercase">Zenboard</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <input placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-blue-500 py-1 px-3 rounded-md text-center cursor-pointer">
            <h5 className="text-white uppercase font-bold">Register</h5>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
          )}
          <Link href={"/"}>
            <p className="text-sm mt-3 text-right hover:text-blue-500 transition-all ease-in-out">
              Already have an account ? <span className="underline">Login</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
