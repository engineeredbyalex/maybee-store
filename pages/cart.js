import Header from "@/components/Basic/Navigation/Header";
import Center from "@/components/Layout/Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/Cart/CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "@/components/Basic/Footer";
import Layout from "@/components/Layout/Layout";
import Banner from "@/components/Basic/Navigation/Banner";

const CartPage = () => {
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
      axios
        .post("/api/cart", {
          ids: cartProducts.map((item) => item.productId),
        })
        .then((response) => {
          const updatedCartProducts = response.data.map((product) => {
            const cartProduct = cartProducts.find(
              (item) => item.productId === product._id
            );
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
      <Layout>
        <div className="w-full min-h-screen mt-[15rem] text-[#595959]">
          <div className="bg-[#fff] mt-4 p-4">
            <h4 className=" font-bold mb-4">Coș de cumpărături</h4>
            {cartProducts.length === 0 && (
              <p className="text-lg font-light mb-4">Coșul dvs. este gol.</p>
            )}
            {products?.length > 0 && (
              <div className="">
                {products.map((product) => {
                  const cartItemsForProduct = cartProducts.filter(
                    (item) => item.productId === product._id
                  );
                  return cartItemsForProduct.map((cartItem, index) => (
                    <div key={cartItem.localId} className="border-b">
                      <div className="flex  mb-4 items-center justify-evenly py-3">
                        <div className="flex-shrink-0">
                          <img
                            className="w-16 h-16 mr-4"
                            src={product.images[0]}
                            alt=""
                          />
                        </div>
                        <div className="flex-grow">
                          <p>{product.title}</p>
                          {Object.keys(cartItem.selectedValues).map(
                            (key, index) => (
                              <p key={index}>
                                {`${key}: ${cartItem.selectedValues[key]}`}
                              </p>
                            )
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => lessOfThisProduct(cartItem.localId)}
                            className="px-2 py-1 bg-gray-200 text-black mr-2"
                          >
                            -
                          </button>
                          <p>{cartItem.quantity}</p>
                          <button
                            onClick={() => moreOfThisProduct(cartItem.localId)}
                            className="px-2 py-1 bg-gray-200 text-black ml-2"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {product.price} RON
                        </div>
                      </div>
                    </div>
                  ));
                })}
                <div className="mt-4">
                  <div className="flex justify-between">
                    <div><p>Produse</p></div>
                    <div><p>{productsTotal} RON</p></div>
                  </div>
                  <div className="flex justify-between">
                    <div><p>Livrare</p></div>
                    <div><p>{shippingFee} RON</p></div>
                  </div>
                  <div className="flex justify-between">
                    <div><p>Total</p></div>
                    <div><p>{productsTotal + parseInt(shippingFee || 0)} RON</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {cartProducts.length > 0 && (
            <div className="p-4">
              <h5 className=" font-medium mb-4">Informații comandă</h5>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nume"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Număr de telefon"
                  value={phone}
                  name="phone"
                  onChange={(ev) => setPhone(ev.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
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
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Adresă Stradală"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Țară"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
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
              {isTicked && (
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
              )}
            </div>
          )}
        </div>
      </Layout>
      <div className=" mt-[30px] lg:mt-[60px]">
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
