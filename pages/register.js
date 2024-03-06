import {  useState } from "react";
import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";

export default function AccountPage() {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const resUserExists = await fetch("/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!resUserExists.ok) {
                const errorMessage = await resUserExists.text();
                console.error('Error:', errorMessage);
                return;
            }

            const { user } = await resUserExists.json();


            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    return (
        <>
            <Header />
            <Layout>
                <div className="w-screen h-screen flex items-center justify-center">
                    <form onSubmit={handleSubmit} className='w-full flex items-center justify-center'>
                        <div className="w-[50%] h-screen flex flex-col items-center justify-start">
                            <div className="mt-[10rem] w-full flex items-center  justify-center flex-col gap-5">
                                <input type="text" placeholder="Nume" onChange={(e) => setName(e.target.value)}  className="w-[70%] bg-transparent border-[0.1rem] border-[#dbdbdb] py-3 px-3" />
                                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  className="w-[70%] bg-transparent border-[0.1rem] border-[#dbdbdb] py-3 px-3" />
                                <input type="password" placeholder="Parola " onChange={(e) => setPassword(e.target.value)} className="w-[70%] bg-transparent border-[0.1rem] border-[#dbdbdb] py-3 px-3" />
                                <h3>
                                    {error}
                                </h3>
                            </div>
                            <div className="border-t-[0.15rem] w-[70%] border-[#dbdbdb] flex items-center justify-center mt-[2rem]">
                                <div className="mt-[1rem]">
                                
                                        <button>
                                            Creaza cont
                                        </button>
                                   
                                </div>
                            </div>
                        </div>
                  </form>
                </div>
            </Layout >
        </>
    );
}
