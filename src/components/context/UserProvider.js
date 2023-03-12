import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({ signedIn: false });
  const router = useRouter();

  /* ATTEMPT SIGN IN WITH COOKIE */

  useEffect(() => {
    console.log(`Provider Refreshed - ${JSON.stringify(userState)}`);

    // Attempt Sign In if not signed in
    if (!userState.signedIn) {
      axios.get("/api/getuser").then((res) => {
        let data = res.data;

        if (data.success) {
          setUserState({ signedIn: true, ...data.userInfo });

          // if certain pages but has cookie login, go to dashboard
          if (["/", "/login", "/signup"].includes(router.pathname)) {
            router.push("/dashboard");
          }
        } else if (!["/login", "/signup"].includes(router.pathname)) {
          router.push("/login");
        }
      });
    }
  });

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
