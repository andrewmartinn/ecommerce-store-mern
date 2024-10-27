type Category = "Men" | "Women" | "Kids";

type SubCategory = "Topwear" | "Bottomwear" | "Winterwear";

interface CartItem {
  [itemSize: string]: number;
}

export interface ICart {
  [productId: string]: CartItem;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: Category;
  subCategory: SubCategory;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

export interface ShopContextType {
  currency: string;
  deliveryFee: number;
  products: IProduct[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICart;
  addToCart: (id: string, size: string) => void;
  getCartCount: () => number;
  updateCartItemQuantity: (
    id: string,
    size: string,
    quantity: number,
  ) => Promise<void>;
  getCartAmount: () => number;
}
