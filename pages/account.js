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
import Link from "next/link";

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
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-[50%] h-screen flex flex-col items-center justify-start">
            <div className="mt-[10rem] w-full flex items-center  justify-center flex-col gap-5">
              <input type="text" placeholder="Email" className="w-[70%] bg-transparent border-[0.1rem] border-[#dbdbdb] py-3 px-3" />
              <input type="text" placeholder="Parola" className="w-[70%] bg-transparent border-[0.1rem] border-[#dbdbdb] py-3 px-3" />
            </div>
            <div className="w-full flex items-center justify-center mt-[3rem] flex-col gap-5">
              <Button>Conectare</Button>
              <Button>Conectare cu google</Button>
            </div>
            <div className="border-t-[0.15rem] w-[70%] border-[#dbdbdb] flex items-center justify-center mt-[2rem]">
              <div className="mt-[1rem]">
                <Link href={'/register'}>
                  <Button>Creaza cont</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </Layout >
    </> 
  );
}
