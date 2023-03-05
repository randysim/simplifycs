import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    signedIn: false,
  });
  const router = useRouter();

  /* ATTEMPT SIGN IN WITH COOKIE */

  const value = {
    userState,
    setUserState,
  };

  useEffect(() => {
    console.log(`Provider Refreshed - signedIn: ${userState.signedIn}`);

    // Attempt Sign In if not signed in
    if (!userState.signedIn) {
      axios.get("api/login")
        .then(res => {
          let data = res.data;
          if (data.success) {
            console.log(`Cookie Sign In`);
            setUserState({ signedIn: true });

            // if certain pages but has cookie login, go to dashboard
            if (
              ["/", "/login"].includes(router.pathname)
            ) router.push("/dashboard");
          } else {
            router.push("/");
          }
        })
    }

    
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
