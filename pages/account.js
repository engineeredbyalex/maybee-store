import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@/components/Basic/Button";
import WhiteBox from "@/components/Layout/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Layout/Input";
import Spinner from "@/components/Basic/Spinner";
import ProductBox from "@/components/Layout/ProductBox";
import Tabs from "@/components/Layout/Tabs";
import SingleOrder from "@/components/Cart/SingleOrder";
import Header from "@/components/Basic/Header";
import { useRouter } from "next/router";

const AccountPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  async function logout() {
await signOut('credentials')
  }
  async function login() {
    await signIn('google');
  }
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country,phone };
    axios.put('/api/address', data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    });
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid Credentials");
      } else {
        router.push("/"); // Redirect to dashboard upon successful login
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setError("An error occurred during login");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        <Header />
        <div className="mt-[10rem] ">
          <div className=" flex flex-row items-center justify-center w-full">
            {/* <div>
              <RevealWrapper delay={0}>
                <div className='bg-transparent'>
                  <Tabs
                    tabs={['Orders', 'Wishlist']}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                  {activeTab === 'Comenzi' && (
                    <>
                      {!orderLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {!session && (
                        <div>
                          {orders.length === 0 && (
                            <p>Login to see your orders</p>
                          )}
                          {orders.length > 0 && orders.map(o => (
                            <SingleOrder {...o} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'Wishlist' && (
                    <>
                      {!wishlistLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {wishlistLoaded && (
                        <>
                          <WishedProductsGrid>
                            {wishedProducts.length > 0 && wishedProducts.map(wp => (
                              <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                            ))}
                          </WishedProductsGrid>
                          {wishedProducts.length === 0 && (
                            <>
                              {session && (
                                <p>Your wishlist is empty</p>
                              )}
                              {!session && (
                                <p>Login to add products to your wishlist</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </RevealWrapper>
            </div> */}
            <div className="width-full flex items-center justify-center">
              <RevealWrapper delay={100}>
                <div className="">
                  <h4 className="uppercase bold">{session ? 'Detalii cont' : 'Conectare'}</h4>
                  {!addressLoaded && (
                    <Spinner fullWidth={true} />
                  )}
                  {addressLoaded && session && (
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                      <input type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                        onChange={ev => setName(ev.target.value)} />
                      <input type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                        onChange={ev => setEmail(ev.target.value)} />
                      <input type="text"
                        placeholder="Numar de telefon"
                        value={phone}
                        name="phone"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                        onChange={ev => setPhone(ev.target.value)} />
                      <div className='flex flex-col gap-3 w-full'>
                        <input type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                          onChange={ev => setCity(ev.target.value)} />
                        <input type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                            className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                          onChange={ev => setPostalCode(ev.target.value)} />
                      </div>
                     <div className="flex flex-col gap-3 w-full">
                       <input type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                        onChange={ev => setStreetAddress(ev.target.value)} />
                      <input type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                          className="w-full py-2 px-3 bg-transparent border-[#595959] border-[0.1rem]"
                        onChange={ev => setCountry(ev.target.value)} />
                     </div>
                      <Button black block
                        onClick={saveAddress}>
                        Salveaza
                      </Button>
                      <hr />
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center" >
                    {session && (
                    <Button primary onClick={logout}>Deconectare</Button>
                  )}
                  {!session && (
                    <Button primary onClick={login}>Conectare</Button>
                  )}
                  </div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
      <button onClick={signIn}>Sign In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AccountPage;
