import { createContext, useState } from "react";
import { products } from "../assets/ui-assets/data";
import { ShopContextType } from "../types";

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined,
);

interface ShopContextProviderProps {
  children: React.ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const currency = "$";
  const deliveryFee = 10;

  return (
    <ShopContext.Provider
      value={{
        currency,
        deliveryFee,
        products,
        searchTerm,
        setSearchTerm,
        showSearchBar,
        setShowSearchBar,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
