import { CartContextProvider } from "../components/Cart/CartContext"
import { SessionProvider } from "next-auth/react";
import '../styles/global.css'
import { Analytics } from "@vercel/analytics/react"

import AuthProvider from "./providers";

export default function App({ Component, pageProps: {  ...pageProps } }) {
  return (
    <>
      <Analytics />
      <AuthProvider>
        <link rel="icon" href="" sizes="any" />
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}
