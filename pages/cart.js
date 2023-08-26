import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "@/components/Footer";

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
    removeProduct,
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
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      { console.log(response.data.phone) }
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
          return null; // Remove this item from the cart
        }
      }
      return cartItem;
    }).filter(Boolean); // Remove null values from the array

    setCartProducts(updatedCartProducts);
  }

  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, phone, city, postalCode, streetAddress, country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;

      // Clear local storage after completing the order
      clearCart(); // Assuming this function clears the cart state
      localStorage.removeItem('cartProducts'); // Clear the cart data from local storage
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
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Mulțumim pentru comandă</h1>
              <p>Vă vom trimite un email când comanda dvs. va fi expediată.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Coș de cumpărături</h2>
              {!cartProducts?.length && (
                <div>Coșul dvs. este gol</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Produs</th>
                      <th>Cantitate</th>
                      <th>Preț</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      cartProducts
                        .filter(item => item.productId === product._id)
                        .map((cartItem, index) => (
                          <tr key={cartItem.localId}>
                            <ProductInfoCell>
                              <ProductImageBox>
                                <img src={product.images[0]} alt="" />
                              </ProductImageBox>
                              <div>
                                <p>{product.title}</p>
                                <p>Decoratiune: {cartItem.selectedDecoration}</p>
                                <p>Parfum: {cartItem.selectedScent}</p>
                              </div>
                            </ProductInfoCell>
                            <QuantityWrapper>
                              <Button onClick={() => lessOfThisProduct(cartItem.localId)}>-</Button>
                              <QuantityLabel>
                                <p>{cartItem.quantity}</p>
                              </QuantityLabel>
                              <Button onClick={() => moreOfThisProduct(cartItem.localId)}>+</Button>
                            </QuantityWrapper>
                            <td>
                              {product.price} RON
                            </td>
                          </tr>
                        ))
                    ))}
                    <tr className="subtotal">
                      <td colSpan={3}>Produse</td>
                      <td>{productsTotal} RON</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={3}>Livrare</td>
                      <td>{shippingFee} RON</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={3}>Total</td>
                      <td>{productsTotal + parseInt(shippingFee || 0)} RON</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Informații comandă</h2>
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
                <Input type="text"
                  placeholder="Număr de telefon"
                  value={phone}
                  name="phone"
                  onChange={ev => setPhone(ev.target.value)} />
                {console.log(phone)}
                <CityHolder>
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
                </CityHolder>
                <Input type="text"
                  placeholder="Adresă Stradală"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={ev => setStreetAddress(ev.target.value)} />
                <Input type="text"
                  placeholder="Țară"
                  value={country}
                  name="country"
                  onChange={ev => setCountry(ev.target.value)} />
                <div>
                  <StyledCheckbox>
                    <Link href="/policy">
                      Sunt de acord cu termenii și condițiile
                    </Link>
                    <span>
                      <input type="checkbox" onClick={() => setIsTicked(!isTicked)} />
                    </span>
                  </StyledCheckbox>
                  {isTicked ? (
                    <Button black block
                      onClick={goToPayment}>
                      Continuă la plată
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer></Footer>
    </>
  );
}