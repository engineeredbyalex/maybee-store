import Header from "@/components/Basic/Header";
import styled from "styled-components";
import Center from "@/components/Layout/Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/Cart/CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "@/components/Basic/Footer";
import Banner from "@/components/Basic/Banner";

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    clearCart,
    setCartProducts,
  } = useContext(CartContext);
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
      axios.post("/api/cart", { ids: cartProducts.map((item) => item.productId) }).then((response) => {
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
    if (typeof window === "undefined") {
      return;
    }
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
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
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
      clearCart();
      localStorage.removeItem("cartProducts");
    }
  }

  async function clearCartHandler() {
    clearCart();
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
        <div className="mt-[10rem]">
          <Center>
            <div>
              <div>
                <h1>Mulțumim pentru comandă</h1>
                <p>Vă vom trimite un email când comanda dvs. va fi expediată.</p>
              </div>
            </div>
          </Center>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner />
      <Header />
      <Center>
        <div className="flex-row lg:flex-row w-full min-h-screen ">
          <div className="bg-[#fff] mt-[20vh] ">
            <div className="w-full flex  mt-[5rem] font-normal text-uppercase mb-5">
              <h1>Coș de cumpărături</h1>
            </div>
            {cartProducts.length === 0 && (
              <div className="w-full flex font-light mb-5"><h1>Coșul dvs. este gol.</h1></div>
            )}
            {products?.length > 0 && (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Produs</th>
                    <th className="px-4 py-2">Cantitate</th>
                    <th className="px-4 py-2">Preț</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const cartItemsForProduct = cartProducts.filter((item) => item.productId === product._id);
                    return cartItemsForProduct.map((cartItem, index) => (
                      <tr key={cartItem.localId} className="border-b">
                        <td className="px-4 py-2">
                          <div className="flex items-center flex-col">
                            <div className="mr-4">
                              <img className="lg:w-[10rem] lg:h-[10rem]" src={product.images[0]} alt="" />
                            </div>
                            <div>
                              <p>{product.title}</p>
                              {Object.keys(cartItem.selectedValues).map((key, index) => (
                                <p key={index}>
                                  {`${key}: ${cartItem
                                    .selectedValues[key]}`}
                                </p>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <button onClick={() => lessOfThisProduct(cartItem.localId)} className="px-2 py-1 bg-gray-200 text-black mr-2">
                              -
                            </button>
                            <p>{cartItem.quantity}</p>
                            <button onClick={() => moreOfThisProduct(cartItem.localId)} className="px-2 py-1 bg-gray-200 text-black ml-2">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2">{product.price} RON</td>
                      </tr>
                    ));
                  })}
                  <tr>
                    <td colSpan={2} className="px-4 py-2">
                      Produse
                    </td>
                    <td className="px-4 py-2">{productsTotal} RON</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-2">
                      Livrare
                    </td>
                    <td className="px-4 py-2">{shippingFee} RON</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-4 py-2">
                      Total
                    </td>
                    <td className="px-4 py-2">{productsTotal + parseInt(shippingFee || 0)} RON</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {cartProducts.length > 0 && (
            <div className="delay-100 py-5">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Informații comandă</h2>
                <input
                  type="text"
                  placeholder="Nume"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                  className="border rounded-lg p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="border rounded-lg p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  i
                  placeholder="Număr de telefon"
                  value={phone}
                  name="phone"
                  onChange={(ev) => setPhone(ev.target.value)}
                  className="border rounded-lg p-2 mb-4 w-full"
                />
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Oraș"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                    className="border rounded-lg p-2 mb-4 md:mb-0 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Cod Poștal"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Adresă Stradală"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                  className="border rounded-lg p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  placeholder="Țară"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                  className="border rounded-lg p-2 mb-4 w-full"
                />
                <div className="mb-4 flex items-center">
                  <div className="mr-2">
                    <Link href="/policy" className="text-blue-500">
                      Sunt de acord cu termenii și condițiile
                    </Link>
                  </div>
                  <input
                    type="checkbox"
                    onClick={() => setIsTicked(!isTicked)}
                    className="h-4 w-4 text-blue-500"
                  />
                </div>
                {isTicked ? (
                  <div>
                    <button
                      onClick={goToPayment}
                      className="bg-black text-white px-4 py-2 rounded-lg w-full mb-4"
                    >
                      Continuă la plată
                    </button>
                    <button
                      onClick={clearCartHandler}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    >
                      Golește coșul
                    </button>
                  </div>
                ) : (
                    <></>
                )}
              </div>
            </div>
          )}
        </div>
      </Center>
      <Footer />
    </>
  );
}