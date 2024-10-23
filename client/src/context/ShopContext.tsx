import { createContext } from "react";
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
  const currency = "$";
  const deliveryFee = 10;

  return (
    <ShopContext.Provider value={{ currency, deliveryFee, products }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
