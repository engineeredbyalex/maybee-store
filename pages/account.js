import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import SingleOrder from "@/components/SingleOrder";
import Footer from "@/components/Footer";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
  @media screen and (max-width:768px){
    display:flex;
    flex-direction:column;
  } 
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [orderLoaded, setOrderLoaded] = useState(false);
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
    const data = { name, email, phone, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  useEffect(() => {
    if (!session) {
      return;
    }

    setAddressLoaded(false);
    setOrderLoaded(false);

    axios.get('/api/address').then(response => {
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setStreetAddress(response.data.streetAddress);
        setCountry(response.data.country);
      }
      setAddressLoaded(true);
    });

    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Title>
                  Comenzi
                </Title>
                {!orderLoaded && (
                  <Spinner fullWidth={true} />
                )}
                {orderLoaded && (
                  <div>
                    {orders.length === 0 && (
                      <p>Conectează-te pentru a-ți vedea comanda.</p>
                    )}
                    {orders.length > 0 && orders.map(o => (
                      <SingleOrder key={o._id} {...o} />
                    ))}
                  </div>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Detalii cont' : 'Loghează-te'}</h2>
                {!addressLoaded && (
                  <Spinner fullWidth={true} />
                )}
                {addressLoaded && session && (
                  <>
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
                    <CityHolder>
                      <Input type="text"
                        placeholder="Oraș"
                        value={city}
                        name="city"
                        onChange={ev => setCity(ev.target.value)} />
                      <Input type="text"
                        placeholder="Cod poștal"
                        value={postalCode}
                        name="postalCode"
                        onChange={ev => setPostalCode(ev.target.value)} />
                    </CityHolder>
                    <Input type="text"
                      placeholder="Strada"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={ev => setStreetAddress(ev.target.value)} />
                    <Input type="text"
                      placeholder="Țară"
                      value={country}
                      name="country"
                      onChange={ev => setCountry(ev.target.value)} />

                    <Button black block
                      onClick={saveAddress}>
                      Salvează
                    </Button>

                    <hr />
                  </>
                )}
                <ButtonWrapper>
                  {session && (
                    <Button primary onClick={logout}>Deloghează</Button>
                  )}
                  {!session && (
                    <Button primary onClick={login}>Loghează-te cu Google</Button>
                  )}
                </ButtonWrapper>
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
      <Footer />
    </>
  );
}

