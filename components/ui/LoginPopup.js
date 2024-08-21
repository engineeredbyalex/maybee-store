import React from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";

const Login = ({ state, updateState, children }) => {
    return (
        <div
            className={
                state
                    ? "w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm absolute top-0 flex justify-center items-center z-[2]"
                    : "hidden"
            }
        >
            <div className="bg-gray-200 max-w-[400px] px-5 py-10 gap-5 flex flex-col relative">
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => updateState(false)}
                        className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
                    >
                        <HiX color="#000" size={24} />
                    </button>
                </div>
                <form className="gap-5 flex flex-col">
                    <h4>Conectează-te la contul tău</h4>
                    <input
                        type="email"
                        name="email"
                        placeholder="Adresă de email"
                    />
                    <div className="w-full gap-2 flex flex-col items-end">
                        <input type="password" name="password" placeholder="Parolă" />
                        <Link href="/">
                            <p>Ai uitat parola ?</p>
                        </Link>
                    </div>
                    <button type="submit" className="button transition">
                        <p>Conectare</p>
                    </button>
                    <div className="w-full flex flex-col gap-2">
                        <h5>Nou la Maybee ?</h5>
                        <p className="">
                            Cu un cont, poți salva produse în cabinetul tău, vizualiza
                            istoricul comenzilor și efectua rapid checkout folosind detaliile
                            salvate.
                        </p>
                        <button className="button_outline transition">
                            <Link href={"/register"}>
                                <p>Creează un cont</p>
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
