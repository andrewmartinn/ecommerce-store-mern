import { useContext } from "react";
import { ShopContextType } from "../types";
import { ShopContext } from "../context/ShopContext";

const useShopContext = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

export default useShopContext;
