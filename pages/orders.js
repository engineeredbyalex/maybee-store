import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const { data: session } = useSession();

    // Function to fetch product titles based on product IDs
    const fetchProductTitles = async (productIds) => {
        try {
            const response = await axios.post('/api/products', { productIds });
            const productsMap = response.data.reduce((acc, product) => {
                acc[product._id] = product.title;
                return acc;
            }, {});
            setProducts(productsMap);
        } catch (error) {
            console.error("Error fetching product titles:", error);
        }
    };

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Email': session?.user?.email
                }
            });
            setOrders(response.data);
            const productIds = response.data.reduce((acc, order) => {
                order.line_items.forEach(item => acc.add(item.productId));
                return acc;
            }, new Set());
            fetchProductTitles(Array.from(productIds));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (session) {
            fetchOrders();
        }
    }, [session?.user?.email]);

    return (
        <>
            <Banner />
            <Header />
            <Layout>
                <div className="container mx-auto mt-[10rem]">
                    <h1 className="text-2xl font-bold my-4 text-center uppercase text-[#595959]">Comenzile mele</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map(order => (
                            <div key={order._id} className="border p-4">
                                <p><strong className="text-[#595959] uppercase">Nume şi prenume:</strong> {order.name}</p>
                                <p><strong className="text-[#595959] uppercase">Email:</strong> {order.email}</p>
                                <p><strong className="text-[#595959] uppercase">Număr de telefon:</strong> {order.phone}</p>
                                <p><strong className="text-[#595959] uppercase">Adresa:</strong> {order.streetAddress}, {order.city}, {order.country}, {order.postalCode}</p>
                                <p><strong className="text-[#595959] uppercase">Comandă creată la:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                <p><strong className="text-[#595959] uppercase">Plătită:</strong> {order.paid ? 'Da' : 'Nu'}</p>
                                <h2 className="text-lg font-semibold mt-2">Conţinut comandă:</h2>
                                <ul>
                                    {order.line_items.map(item => (
                                        <li key={item.productId}>
                                            <p><strong className="text-[#595959] uppercase">Nume produs:</strong> {products[item.productId]}</p>
                                            <p><strong className="text-[#595959] uppercase">Cantitate:</strong> {item.quantity}</p>
                                            {/* Add more details as needed */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}
