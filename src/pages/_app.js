import "@/styles/globals.css";

import UserProvider from "@/components/context/UserProvider";
import ThemeProvider from "@/components/context/ThemeProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
