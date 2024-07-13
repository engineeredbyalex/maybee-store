import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Basic/Header";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";
import Layout from "@/components/Layout/Layout";
import Page from "@/components/Layout/Page";

export default function OrderDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/orders?id=${id}`)
                .then((response) => {
                    setOrder(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching order:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Se încarcă...</div>;
    }

    if (!order) {
        return <div>Nu a fost găsită nicio comandă.</div>;
    }

    return (
        <div className="text-[#000] overflow-x-hidden">
            <Banner />
            <Header />
            <div className="mt-[5rem]">
                <Layout>
                    <div className=" w-full flex flex-col items-center justify-center">
                        <div className="w-full max-w-3xl flex flex-col items-start justify-center text-left bg-white p-8 rounded-lg shadow-md">
                            <h3 className="uppercase mb-4 text-le">Detalii Comandă</h3>
                            <div className="text-left w-full">
                                <h5 className="mb-2">ID Comandă: {order._id}</h5>
                                <h5 className="mb-2">Nume: {order.name}</h5>
                                <h5 className="mb-2">Email: {order.email}</h5>
                                <h5 className="mb-2">Telefon: {order.phone}</h5>
                                <h5 className="mb-2">Adresă: {order.streetAddress}, {order.city}, {order.postalCode}, {order.country}</h5>
                                <h5 className="mb-4">Plătit: {order.paid ? 'Da' : 'Nu'}</h5>

                                <h5 className="text-xl font-semibold mb-4">Produse Comandate:</h5>
                                <ul className="mb-4">
                                    {order.line_items.map((item) => (
                                        <li key={item.productId} className="mb-2">
                                            {item.selectedValues.map((value) => (
                                                <p key={value.propertyName}>
                                                    {value.propertyName}: {value.value},
                                                </p>
                                            ))}
                                            <p> Cantitate: {item.quantity} x Preț: {item.price} RON</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
            <Footer />
        </div>
    );
}
