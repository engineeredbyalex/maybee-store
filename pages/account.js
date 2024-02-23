import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Basic/Button";
import Input from "@/components/Layout/Input";
import Spinner from "@/components/Basic/Spinner";
import ProductBox from "@/components/Layout/ProductBox";
import Tabs from "@/components/Layout/Tabs";
import SingleOrder from "@/components/Cart/SingleOrder";
import Header from "@/components/Basic/Header";
import Layout from "@/components/Layout/Layout";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [phone, setPhone] = useState([]);

  async function register() {
  // Implement your registration logic here
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country, phone };
    axios.put('/api/address', data);
  }

  function fetchAddressData() {
    axios.get('/api/address').then(response => {
      const { name, email, city, postalCode, streetAddress, country, phone } = response.data;
      setName(name);
      setEmail(email);
      setCity(city);
      setPostalCode(postalCode);
      setStreetAddress(streetAddress);
      setCountry(country);
      setCountry(phone);
      setAddressLoaded(true);
    });
  }

  function fetchWishlistData() {
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    });
  }

  function fetchOrdersData() {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }

  useEffect(() => {
    if (session) {
      setAddressLoaded(false);
      setWishlistLoaded(false);
      setOrderLoaded(false);
      fetchAddressData();
      fetchWishlistData();
      fetchOrdersData();
    }
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Layout>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full ">
          {session ? (
            <div className="w-screen h-[25vh] lg:w-[25vw] lg:h-screen bg-[#252525]  text-[#FDFCEA] flex items-center justify-center ">
              <div className="mt-[10vh] w-full grid grid-cols-3 lg:flex lg:flex-col items-center justify-center">
                <p>Cont</p>
                <p>Comenzi</p>
                <p>Setari</p>
                <p>Contact</p>
                <button onClick={() => signOut("google")}>
                  <p className="bg-[#595959] lg:min-w-[15rem] max-h-[10rem] text-[#FDFCEA] flex items-center justify-center px-3 py-2 rounded-md uppercase">Deconectare</p>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className=" w-full lg:w-[75vw] h-screen border-[#595959] flex items-center justify-center ">
            <div className=" text-[#595959] flex items-start justify-center w-auto  mt-[10vh] flex-col">
              <div className="w-auto mt-5 text-center">
                {session ? (
                  <h4 className="uppercase">Buna ziua,<br /> {session.user.name}</h4>
                ) : (
                  <h5 className="leading-[3rem] text-center">Va rugam sa va conectati sau sa va creati un cont</h5>
                )}
              </div>
              <div className="w-[30rem] flex items-center justify-center text-center ">
                {session ?
                  (<div className="h-full w-full flex items-center justify-center flex-col">
                    <p className="uppercase">Date utilizator</p>
                    <div className="flex flex-col items-center justify-center">
                      <Input type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={ev => setName(ev.target.value)} />
                      <Input type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={ev => setEmail(ev.target.value)} />
                      <div>
                        <Input type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          onChange={ev => setCity(ev.target.value)} />
                        <Input type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                          onChange={ev => setPostalCode(ev.target.value)} />
                      </div>
                      <Input type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={ev => setStreetAddress(ev.target.value)} />
                      <Input type="numbers"
                        placeholder="Numar de telefon"
                        value={phone}
                        name="phoneNumber"
                        onChange={ev => setPhone(ev.target.value)} />
                      <Input type="text"
                        placeholder="Tara"
                        value={country}
                        name="country"
                        onChange={ev => setCountry(ev.target.value)} />
                      <button className="bg-[#595959] lg:min-w-[15rem] max-h-[10rem] text-[#FDFCEA] flex items-center justify-center px-3 py-2 rounded-md uppercase mt-5 cursor-pointer"
                        onClick={saveAddress}>
                        <p>   Salveaza</p>
                      </button>
                    </div>
                  </div>)
                  :
                  (<div>
                    <div className="w-[30rem] mt-5 flex items-center justify-center text-center flex-col ">
                      <label >
                        <p>Email</p>
                      </label>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={ev => setEmail(ev.target.value)}
                        className="bg-transparent"
                      />
                      <label >
                        <p>
                          Parola
                        </p>
                      </label>
                      <Input
                        type="password"
                        placeholder="Parolă"
                        value={password}
                        name="password"
                        onChange={ev => setPassword(ev.target.value)}
                        className="bg-transparent"
                      />
                      <div className="mt-5">
                        <button onClick={() => signIn("google")}><p className="uppercase">Conectare</p></button>
                      </div>
                      <p className="bg-[#595959] lg:min-w-[15rem] max-h-[10rem] text-[#FDFCEA] flex items-center justify-center px-3 py-2 rounded-md uppercase mt-5 cursor-pointer">Creare cont</p>
                    </div>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div >
      </Layout >
    </>
  );
}
