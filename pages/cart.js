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


const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
      grid-template-columns: 1.2fr .8fr;
    }
    gap: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
    table thead tr th:nth-child(3),
    table tbody tr td:nth-child(3),
    table tbody tr.subtotal td:nth-child(2){
      text-align: right;
    }
    table tr.subtotal td{
      padding: 15px 0;
    }
    table tbody tr.subtotal td:nth-child(2){
      font-size: 1.4rem;
    }
    tr.total td{
      font-weight: bold;
    }
  `;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
  `;

const ProductInfoCell = styled.td`
    padding: 10px 0;
    button{padding:0 !important;}
  `;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
      max-width: 60px;
      max-height: 60px;
    }
    @media screen and (min-width: 768px) {
      padding: 10px;
      width: 100px;
      height: 100px;
      img{
        max-width: 80px;
        max-height: 80px;
      }
    }
  `;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px) {
      display: inline-block;
      padding: 0 6px;
    }
  `;

const CityHolder = styled.div`
    display:flex;
    gap: 5px;
  `;

const StyledCheckbox = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background: none;

    span {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #333;
      border-radius: 4px;

      input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;

        &:checked + span::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background-color: #333;
          border-radius: 50%;
        }
      }
    }
  }

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const QuantityWrapper = styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
`
export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    clearCart,
    setCartProducts,
  } = useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);

  const [isTicked, setIsTicked] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts.map(item => item.productId) })
        .then(response => {
          const updatedCartProducts = response.data.map(product => {
            const cartProduct = cartProducts.find(item => item.productId === product._id);
            if (cartProduct) {
              return {
                ...product,
                selectedScent: cartProduct.selectedScent,
                selectedDecoration: cartProduct.selectedDecoration,
                quantity: cartProduct.quantity,
              };
            }
            return product;
          });

          setProducts(updatedCartProducts);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);


  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    })
  }, [clearCart]);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
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
    const cartItem = cartProducts.find(item => item.localId === localId);
    if (cartItem) {
      addProduct(cartItem.productId, cartItem.selectedScent, cartItem.selectedDecoration);
    }
  }

  function lessOfThisProduct(localId) {
    const updatedCartProducts = cartProducts.map(cartItem => {
      if (cartItem.localId === localId) {
        if (cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return null;
        }
      }
      return cartItem;
    }).filter(Boolean);

    setCartProducts(updatedCartProducts);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, phone, city, postalCode, streetAddress, country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
      clearCart();
      localStorage.removeItem('cartProducts');
    }
  }


  const productsTotal = cartProducts.reduce((total, cartItem) => {
    const product = products.find(p => p._id === cartItem.productId);
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
            <ColumnsWrapper>
              <Box>
                <h1>Mulțumim pentru comandă</h1>
                <p>Vă vom trimite un email când comanda dvs. va fi expediată.</p>
              </Box>
            </ColumnsWrapper>
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
          <div className="p-[30px] bg-[#fff] rounded-lg shadow-md mt-[5rem] ">
            <div className="w-full flex  text-5xl mt-[5rem] font-normal text-uppercase mb-5">Coș de cumpărături</div>
            {cartProducts?.length === 0 && (
              <div className="w-full flex  text-3xl  font-light  mb-5">Coșul dvs. este gol.</div>
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
                    {products.map((product) =>
                      cartProducts
                        .filter((item) => item.productId === product._id)
                        .map((cartItem, index) => (
                          <tr key={cartItem.localId} className="border-b">
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <img className="w-[150px] h-[150px]" src={product.images[0]} alt="" />
                                </div>
                                <div>
                                  <p>{product.title}</p>
                                  {cartItem.selectedDecoration ? (<p>Decoratiune: {cartItem.selectedDecoration}</p>) : (null)}
                                  {cartItem.selectedScent ? (<p>Parfum: {cartItem.selectedScent}</p>) : (null)}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <button onClick={() => lessOfThisProduct(cartItem.localId)} className="px-2 py-1 bg-gray-200 text-black mr-2">-</button>
                                <p>{cartItem.quantity}</p>
                                <button onClick={() => moreOfThisProduct(cartItem.localId)} className="px-2 py-1 bg-gray-200 text-black ml-2">+</button>
                              </div>
                            </td>
                            <td className="px-4 py-2">{product.price} RON</td>
                          </tr>
                        ))
                    )}
                    <tr >
                      <td colSpan={2} className="px-4 py-2">Produse</td>
                      <td className="px-4 py-2">{productsTotal} RON</td>
                    </tr>
                    <tr >
                      <td colSpan={2} className="px-4 py-2">Livrare</td>
                      <td className="px-4 py-2">{shippingFee} RON</td>
                    </tr>
                    <tr >
                      <td colSpan={2} className="px-4 py-2">Total</td>
                      <td className="px-4 py-2">{productsTotal + parseInt(shippingFee || 0)} RON</td>
                    </tr>
                  </tbody>
                </table >
              )}
          </div >
          {cartProducts?.length && (
            <div className="delay-100 py-5">
              <div className="bg-white p-6 rounded-lg shadow-md">
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
                  i placeholder="Număr de telefon"
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
                    <Link href="/policy" className="text-blue-500">Sunt de acord cu termenii și condițiile</Link>
                  </div>
                  <input
                    type="checkbox"
                    onClick={() => setIsTicked(!isTicked)}
                    className="h-4 w-4 text-blue-500"
                  />
                </div>
                {isTicked ? (
                  <button
                    onClick={goToPayment}
                    className="bg-black text-white px-4 py-2 rounded-lg w-full"
                  >
                    Continuă la plată
                  </button>
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