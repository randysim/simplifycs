import { createContext } from "react";

const UserContext = createContext({
  signedIn: false,
  authToken: "",
});

export default UserContext;
