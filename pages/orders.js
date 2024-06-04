import Header from "@/components/Basic/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/Cart/CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";
import Banner from "@/components/Basic/Banner";

const CartPage = () => {
    const { cartProducts, addProduct, clearCart, setCartProducts } = useContext(CartContext);
    const { data: session } = useSession();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState(null);
    const [isTicked, setIsTicked] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios
                .post("/api/cart", { ids: cartProducts.map((item) => item.productId) })
                .then((response) => {
                    const updatedCartProducts = response.data.map((product) => {
                        const cartProduct = cartProducts.find((item) => item.productId === product._id);
                        if (cartProduct) {
                            return {
                                ...product,
                                selectedValues: cartProduct.selectedValues,
                                quantity: cartProduct.quantity,
                            };
                        }
                        return product;
                    });
                    setProducts(updatedCartProducts);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (window?.location.href.includes("success")) {
            setIsSuccess(true);
            clearCart();
            localStorage.removeItem("cartProducts");
        }

        axios.get("/api/settings?name=shippingFee").then((res) => {
            setShippingFee(res.data.value);
        });
    }, [clearCart]);

    useEffect(() => {
        if (!session) return;

        axios.get("/api/address").then((response) => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            setPhone(response.data?.phone);
            setCity(response.data?.city);
            setPostalCode(response.data?.postalCode);
            setStreetAddress(response.data?.streetAddress);
            setCountry(response.data?.country);
        });
    }, [session]);

    function moreOfThisProduct(localId) {
        const updatedCartProducts = cartProducts.map((cartItem) => {
            if (cartItem.localId === localId) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCartProducts(updatedCartProducts);
    }

    function lessOfThisProduct(localId) {
        const updatedCartProducts = cartProducts
            .map((cartItem) => {
                if (cartItem.localId === localId) {
                    if (cartItem.quantity > 1) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                    } else {
                        return null;
                    }
                }
                return cartItem;
            })
            .filter(Boolean);
        setCartProducts(updatedCartProducts);
    }

    async function goToPayment() {
        const response = await axios.post("/api/checkout", {
            name,
            email,
            phone,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts: cartProducts.map((cartProduct) => ({
                ...cartProduct,
                selectedValues: cartProduct.selectedValues,
            })),
        });

        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    async function clearCartHandler() {
        localStorage.removeItem("cartProducts");
        setProducts([]);
    }

    const productsTotal = cartProducts.reduce((total, cartItem) => {
        const product = products.find((p) => p._id === cartItem.productId);
        if (product) {
            const price = product.price || 0;
            return total + price * cartItem.quantity;
        }
        return total;
    }, 0);

    if (isSuccess) {
        return (
            <>
                <Banner />
                <Header />
                <div className="mt-20 text-center">
                    <h1 className="text-2xl font-bold">Mulțumim pentru comandă</h1>
                    <p>Vă vom trimite un email când comanda dvs. va fi expediată.</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Banner />
            <Header />
            <Layout>
                <div className="w-full min-h-screen mt-16 px-4 text-gray-700">
                    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-xl font-bold mb-4">Coș de cumpărături</h4>
                        {cartProducts.length === 0 && (
                            <p className="text-lg font-light mb-4">Coșul dvs. este gol.</p>
                        )}
                        {products?.length > 0 && (
                            <div className="space-y-4">
                                {products.map((product) => {
                                    const cartItemsForProduct = cartProducts.filter(
                                        (item) => item.productId === product._id
                                    );
                                    return cartItemsForProduct.map((cartItem, index) => (
                                        <div key={cartItem.localId} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                            <div className="flex items-center">
                                                <img className="w-16 h-16 object-cover rounded-lg mr-4" src={product.images[0]} alt={product.title} />
                                                <div>
                                                    <p className="text-lg font-semibold">{product.title}</p>
                                                    {Object.keys(cartItem.selectedValues).map((key, index) => (
                                                        <p key={index} className="text-sm text-gray-500">
                                                            {`${key}: ${cartItem.selectedValues[key]}`}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => lessOfThisProduct(cartItem.localId)}
                                                    className="px-2 py-1 bg-orange-300 text-black rounded-lg"
                                                >
                                                    -
                                                </button>
                                                <p className="px-4">{cartItem.quantity}</p>
                                                <button
                                                    onClick={() => moreOfThisProduct(cartItem.localId)}
                                                    className="px-2 py-1 bg-orange-300 text-black rounded-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold">{product.price} RON</p>
                                            </div>
                                        </div>
                                    ));
                                })}
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <p>Produse</p>
                                        <p>{productsTotal} RON</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Livrare</p>
                                        <p>{shippingFee} RON</p>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <p>Total</p>
                                        <p>{productsTotal + parseInt(shippingFee || 0)} RON</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {cartProducts.length > 0 && (
                            <div className="mt-8 space-y-4">
                                <h5 className="text-lg font-medium mb-4">Informații comandă</h5>
                                <input
                                    type="text"
                                    placeholder="Nume"
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                    className="w-full p-2 border rounded-lg mb-4"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    className="w-full p-2 border rounded-lg mb-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Număr de telefon"
                                    value={phone}
                                    onChange={(ev) => setPhone(ev.target.value)}
                                    className="w-full p-2 border rounded-lg mb-4"
                                />
                                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Oraș"
                                        value={city}
                                        onChange={(ev) => setCity(ev.target.value)}
                                        className="w-full p-2 border rounded-lg mb-4 md:mb-0"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cod Poștal"
                                        value={postalCode}
                                        onChange={(ev) => setPostalCode(ev.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Adresă Stradală"
                                    value={streetAddress}
                                    onChange={(ev) => setStreetAddress(ev.target.value)}
                                    className="w-full p-2 border rounded-lg mb-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Țară"
                                    value={country}
                                    onChange={(ev) => setCountry(ev.target.value)}
                                    className="w-full p-2 border rounded-lg mb-4"
                                />
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        onClick={() => setIsTicked(!isTicked)}
                                        className="h-4 w-4 text-blue-500 mr-2"
                                    />
                                    <Link href="/policy" className="text-blue-500">
                                        Sunt de acord cu termenii și condițiile
                                    </Link>
                                </div>
                                {isTicked && (
                                    <div className="space-y-4">
                                        <button
                                            onClick={goToPayment}
                                            className="w-full bg-black text-white py-2 rounded-lg"
                                        >
                                            Continuă la plată
                                        </button>
                                        <button
                                            onClick={clearCartHandler}
                                            className="w-full bg-red-500 text-white py-2 rounded-lg"
                                        >
                                            Golește coșul
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
            <Footer />
        </>
    );
};

export default CartPage;
