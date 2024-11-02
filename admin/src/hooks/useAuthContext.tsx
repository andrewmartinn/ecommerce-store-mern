import { useContext } from "react";
import { AuthContextType } from "../types";
import AuthContext from "../context/AuthContext";

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("useAuthContext must be used within a useAuthContextProvider");
  }
  return context;
};
export default useAuthContext;
