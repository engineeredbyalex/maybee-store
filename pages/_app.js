
import { CartContextProvider } from '@/components/cart/CartContext';
import { SessionProvider } from "next-auth/react";
import '@/styles/global.css'



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <link rel="icon" href="" sizes="any" />
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
