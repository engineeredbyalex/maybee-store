import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import Header from "@/components/basic/Header";
import Footer from "@/components/basic/Footer";
import Banner from "@/components/basic/Banner";
import Layout from "@/components/layout/Layout";
import OrderStatusIndicator from "@/components/basic/OrderStatusIndicator";

export default function Orders() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        if (session) {
            axios
                .get("/api/orders", {
                    headers: {
                        'user-email': session.user.email
                    }
                })
                .then((response) => {
                    const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                    console.log(sortedOrders);
                    setLoadingOrders(false);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    setLoadingOrders(false);
                });

            axios
                .get("/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setLoadingProducts(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoadingProducts(false);
                });
        } else {
            setLoadingOrders(false);
            setLoadingProducts(false);
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

    const getProductTitle = (productId) => {
        const product = products.find((product) => product._id === productId);
        return product ? product.title : "Produs necunoscut";
    };

    return (
        <div>
            <Banner />
            <Header />
            <div className="mt-[5rem] min-h-screen">
                <Layout>
                    <div className="w-full flex flex-col items-start justify-center">
                        <h3 className=" font-semibold text-black mb-[3.5rem]">Comenzile dvs.</h3>

                        {loadingOrders || loadingProducts ? (
                            <div>Se încarcă comenzile...</div>
                        ) : orders.length === 0 ? (
                            <p>Nu a fost găsită nicio comandă.</p>
                        ) : (
                            <ul className="w-full max-w-3xl flex flex-col items-center justify-center text-left space-y-4">
                                {orders.map((order) => (
                                    <li key={order._id} className="bg-white p-4 rounded-lg shadow-md w-full">
                                        <h4 className="text-lg font-bold mb-2">Comanda #{order._id}</h4>
                                        <p className="mb-2">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="mb-2">Total: {order.line_items.reduce((total, item) => total + item.price * item.quantity, 0)} RON</p>
                                        <p>Status comandă : {order.status}</p>
                                        <ul className="mb-4">
                                            {order.line_items.map((item, index) => (
                                                <li key={index} className="border-b border-gray-200 py-2">
                                                    <p>Produs: {getProductTitle(item.productId)}</p>
                                                    <p>Preț: {item.price} RON</p>
                                                    <p>Cantitate: {item.quantity}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={`/orders/${order._id}`}>
                                            <p className="text-blue-500">Vezi detaliile comenzii</p>
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
