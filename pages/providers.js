
import { SessionProvider } from "next-auth/react";

export default AuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};