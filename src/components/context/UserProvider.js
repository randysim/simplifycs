import UserContext from "./UserContext";
import { useState, useEffect } from "react";

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
    console.log(
      `Provider Refreshed, Token: ${userState.authToken || "NO TOKEN"}`
    );
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
