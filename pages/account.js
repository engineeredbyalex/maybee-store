import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Basic/Button";
import WhiteBox from "@/components/Layout/WhiteBox";
import Input from "@/components/Layout/Input";
import Spinner from "@/components/Basic/Spinner";
import ProductBox from "@/components/Layout/ProductBox";
import Tabs from "@/components/Layout/Tabs";
import SingleOrder from "@/components/Cart/SingleOrder";
import Header from "@/components/Basic/Navigation/Header";
import Banner from "@/components/Basic/Navigation/Banner";

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
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  }

  async function login() {
    await signIn('google');
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  function fetchAddressData() {
    axios.get('/api/address').then(response => {
      const { name, email, city, postalCode, streetAddress, country } = response.data;
      setName(name);
      setEmail(email);
      setCity(city);
      setPostalCode(postalCode);
      setStreetAddress(streetAddress);
      setCountry(country);
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
      <Banner />
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[10rem] gap-4">
        <div >
          <WhiteBox>
            <Tabs
              tabs={['Comenzi', 'Wishlist']}
              active={activeTab}
              onChange={setActiveTab}
            />
            {activeTab === 'Orders' && (
              <>
                {!orderLoaded ? (
                  <Spinner fullWidth={true} />
                ) : (
                  <div>
                      {orders.length === 0 ? (
                        <p>Conectați-vă pentru a vedea comenzile dvs.</p>
                      ) : (
                        orders.map(o => <SingleOrder key={o._id} {...o} />)
                      )}
                  </div>
                )}
              </>
            )}
            {activeTab === 'Wishlist' && (
              <>
                {!wishlistLoaded ? (
                  <Spinner fullWidth={true} />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishedProducts.length > 0 ? (
                        wishedProducts.map(wp => (
                          <ProductBox
                            key={wp._id}
                            {...wp}
                            wished={true}
                            onRemoveFromWishlist={productRemovedFromWishlist}
                          />
                        ))
                      ) : (
                        <>
                          {session ? (
                            <p>Listă de dorințe goală</p>
                          ) : (
                            <p>Conectați-vă pentru a adăuga produse la lista de dorințe</p>
                          )}
                        </>
                    )}
                  </div>
                    </>
                )}
              </>
            )}
          </WhiteBox>

        </div>
        <div>

          <WhiteBox>
            <h2>{session ? 'Detalii cont' : 'Conectare'}</h2>
            {!addressLoaded ? (
              <Spinner fullWidth={true} />
            ) : (
              <div>
                <Input
                  type="text"
                  placeholder="Nume"
                  value={name}
                  name="name"
                    onChange={ev => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                    onChange={ev => setEmail(ev.target.value)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                    placeholder="Oraș"
                    value={city}
                    name="city"
                      onChange={ev => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Cod poștal"
                    value={postalCode}
                    name="postalCode"
                      onChange={ev => setPostalCode(ev.target.value)}
                    />
                </div>
                  <Input
                    type="text"
                  placeholder="Adresă"
                  value={streetAddress}
                  name="streetAddress"
                    onChange={ev => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Țară"
                  value={country}
                  name="country"
                    onChange={ev => setCountry(ev.target.value)}
                  />
                  <Button black block onClick={saveAddress}>
                  Salvează
                </Button>
                  <hr />
                  {session ? (
                    <Button primary onClick={logout}>Deconectare</Button>
                  ) : (
                    <Button primary onClick={login}>Conectați-vă cu Google</Button>
                  )}
              </div>
            )}
          </WhiteBox>
        </div>
      </div >
    </>
  );
}
