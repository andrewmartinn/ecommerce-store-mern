import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { products } from "../assets/ui-assets/data";
import { ICart, ShopContextType } from "../types";

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
  const [cartItems, setCartItems] = useState<ICart>({});

  const currency = "$";
  const deliveryFee = 10;

  const addToCart = async (itemId: string, itemSize: string) => {
    if (!itemSize) {
      toast.error("Please select a size!");
      return;
    }

    const cartData = structuredClone(cartItems);
    // check item exists on cart
    if (cartData[itemId]) {
      // update size quantity
      if (cartData[itemId][itemSize]) {
        cartData[itemId][itemSize] += 1;
      } else {
        // create new size entry
        cartData[itemId][itemSize] = 1;
      }
    } else {
      // create new product entry
      cartData[itemId] = { [itemSize]: 1 };
    }

    setCartItems(cartData);
  };

  const updateCartItemQuantity = async (
    itemId: string,
    itemSize: string,
    itemQuantity: number,
  ): Promise<void> => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][itemSize] = itemQuantity;

    setCartItems(cartData);
  };

  const getCartCount = (): number => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const itemSize in cartItems[itemId]) {
        try {
          if (cartItems[itemId][itemSize] > 0) {
            totalCount += cartItems[itemId][itemSize];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  };

  const getCartAmount = (): number => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      // find product by id
      const productItem = products.find((p) => p._id === itemId);

      if (productItem) {
        for (const itemSize in cartItems[itemId]) {
          const quantity = cartItems[itemId][itemSize];
          // calculate price based on quantity
          if (quantity > 0) {
            totalAmount += productItem.price * cartItems[itemId][itemSize];
          }
        }
      }
    }

    return totalAmount;
  };

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
        cartItems,
        addToCart,
        getCartCount,
        updateCartItemQuantity,
        getCartAmount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
