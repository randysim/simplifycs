import UserContext from "./UserContext";
import { useState, useEffect } from "react";

import axios from "axios";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    signedIn: false,
  });

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
          }
        })
    }

    
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
