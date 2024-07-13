import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import Page from "@/components/Layout/Page";
import Layout from "@/components/Layout/Layout";

export default function Orders() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            axios
                .get("/api/orders", {
                    headers: {
                        'user-email': session.user.email
                    }
                })
                .then((response) => {
                    setOrders(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [session]);

    if (status === "loading") {
        return <div>Se încarcă...</div>;
    }

    if (!session) {
        return (
            <div>
                <Banner />
                <Header />
                <div className="mt-[5rem] min-h-screen">
                    <Layout>
                        <div className="w-full flex flex-col items-start justify-center">
                            <h5 className="text-[#000] mb-4">Vă rugăm să vă conectați pentru a vizualiza comenzile dumneavoastră.</h5>
                            <button onClick={() => signIn()} className="bg-black text-white px-4 py-2 rounded-md">
                                Conectare
                            </button>
                        </div>
                    </Layout>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Banner />
            <Header />
            <div className="mt-[5rem] min-h-screen">
                <Layout>
                    <div className="w-full flex flex-col items-start justify-center">
                        <h5 className="text-[#000] mb-4">Comenzile dvs.</h5>
                        {loading ? (
                            <div>Se încarcă comenzile...</div>
                        ) : orders.length === 0 ? (
                            <p>Nu a fost găsită nicio comandă.</p>
                        ) : (
                            <ul className="w-full max-w-3xl flex flex-col items-center justify-center text-left space-y-4">
                                {orders.map((order) => (
                                    <li key={order._id} className="bg-white p-4 rounded-lg shadow-md w-full">
                                        <h4 className="text-lg font-bold mb-2">Comanda #{order._id}</h4>
                                        <p className="mb-2">Data: {new Date(order.date).toLocaleDateString()}</p>
                                        <p className="mb-2">Total: {order.total} RON</p>
                                        <Link href={`/orders/${order._id}`}>
                                            <p className="text-blue-500 ">Vezi detaliile comenzii</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Layout>
            </div>
            <Footer />
        </div>
    );
}
