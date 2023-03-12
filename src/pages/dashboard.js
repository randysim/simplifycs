import { useContext } from "react";
import UserContext from "../components/context/UserContext";

export default function Dashboard() {
  const [userState, setUserState] = useContext(UserContext);

  return (
    <p style={{color: "white"}}>Welcome {userState.firstName}</p>
  );
}
