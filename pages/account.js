import Header from "@/components/Basic/Header";
import Center from "@/components/Layout/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Basic/Button";
import WhiteBox from "@/components/Layout/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Layout/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Basic/Spinner";
import ProductBox from "@/components/Layout/ProductBox";
import Tabs from "@/components/Layout/Tabs";
import SingleOrder from "@/components/Cart/SingleOrder";
import Banner from "@/components/Basic/Banner";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn('google');
  }
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
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
  return (
    <>
      <Banner />
      <Header />
      <Center>
        <div className="grid grid-cols-2 gap-8 mb-10 mt-[10rem]">
          <div>

              <WhiteBox>
                <Tabs
                  tabs={['Comenzi', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Comenzi' && (
                  <>
                    {!orderLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && (
                          <p>Nu există comenzi</p>
                        )}
                        {orders.length > 0 && orders.map(o => (
                          <SingleOrder key={orders.id} {...o} />
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
                      <div className="flex flex-col lg:grid grid-cols-2 gap-[15rem] scale-75">
                        {wishedProducts.length > 0 && wishedProducts.map(wp => (
                          <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                        ))}
                        {wishedProducts.length === 0 && (
                          <p>{session ? 'Wishlist gol' : 'Loghează-te pentru a adăuga produse in wishlist'}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </WhiteBox>

          </div>
          <div>

              <WhiteBox>
              <h2>{session ? 'Detalii cont' : 'Login'}</h2>
                {!addressLoaded && (
                  <Spinner fullWidth={true} />
                )}
                {addressLoaded && session && (
                  <div>
                    <Input type="text"
                      placeholder="Nume"
                      value={name}
                      name="name"
                      onChange={ev => setName(ev.target.value)} />
                    <Input type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={ev => setEmail(ev.target.value)} />
                    <div className="flex gap-5 mb-4">
                      <Input type="text"
                        placeholder="Oraș"
                        value={city}
                        name="city"
                        onChange={ev => setCity(ev.target.value)} />
                      <Input type="text"
                        placeholder="Cod Poștal"
                        value={postalCode}
                        name="postalCode"
                        onChange={ev => setPostalCode(ev.target.value)} />
                    </div>
                    <Input type="text"
                      placeholder="Adresă"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={ev => setStreetAddress(ev.target.value)} />
                    <Input type="text"
                      placeholder="Județ"
                      value={country}
                      name="country"
                      onChange={ev => setCountry(ev.target.value)} />
                    <Button black block
                      onClick={saveAddress}>
                      Salvează
                    </Button>
                    <hr />
                  </div>
                )}
                {session && (
                  <Button primary onClick={logout}>Logout</Button>
                )}
                {!session && (
                  <Button primary onClick={login}>Contectare cu Google</Button>
                )}
              </WhiteBox>

          </div>
        </div>
      </Center>
    </>
  );
}
