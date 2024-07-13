import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import Layout from "@/components/Layout/Layout";

const Address = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addressData, setAddressData] = useState({
        name: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "",
    });

    useEffect(() => {
        if (session) {
            // Fetch user's address if logged in
            axios
                .get("/api/address", {
                    headers: {
                        "user-email": session.user.email,
                    },
                })
                .then((response) => {
                    setAddressData(response.data || {});
                })
                .catch((error) => {
                    console.error("Error fetching address:", error);
                });
        }
    }, [session]);

    const handleChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put("/api/address", addressData, {
                headers: {
                    "user-email": session.user.email,
                },
            });
            console.log("Address updated:", response.data);
            // Optionally, you can show a success message or redirect
        } catch (error) {
            console.error("Error updating address:", error);
            setError("A apărut o eroare în timpul actualizării adresei.");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <>
                <Banner />
                <Header />
                <div className="mt-[5rem]">
                    <Layout>
                        <div className="w-full flex flex-col items-center justify-center">
                            <h4 className="text-[#000] mb-4">
                                Vă rugăm să vă conectați pentru a vizualiza și actualiza adresa de livrare.
                            </h4>
                            <button onClick={() => signIn()} className="bg-black text-white px-4 py-2 rounded-md">
                                Conectare
                            </button>
                        </div>
                    </Layout>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Banner />
            <Header />
            <div className="mt-[5rem]">
                <Layout>
                    <div className="w-full max-w-3xl flex flex-col items-center justify-center text-center bg-white p-8 rounded-lg shadow-md">
                        <h4 className="uppercase text-2xl mb-4">Actualizare Adresă de Livrare</h4>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nume
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={addressData.name || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={addressData.email || ""}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Telefon
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={addressData.phone || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                                    Adresă
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    value={addressData.streetAddress || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    Oraș
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={addressData.city || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                    Cod Poștal
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    value={addressData.postalCode || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Țară
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    value={addressData.country || ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm italic">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? "Se încarcă..." : "Actualizează Adresa"}
                            </button>
                        </form>
                    </div>
                </Layout>
            </div>
            <Footer />
        </>
    );
};

export default Address;
