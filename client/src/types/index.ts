import { ILoginForm, IRegisterForm } from "../utils/validator";

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
  bestSeller: boolean;
  selectedSize?: string;
  quantity?: number;
}

export interface ShopContextType {
  currency: string;
  deliveryFee: number;
  products: IProduct[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCartItems: React.Dispatch<React.SetStateAction<ICart>>;
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICart;
  addToCart: (id: string, size: string) => Promise<void>;
  getCartCount: () => number;
  updateCartItemQuantity: (
    id: string,
    size: string,
    quantity: number,
  ) => Promise<void>;
  getCartAmount: () => number;
}

export interface AuthContextType {
  token: string | null;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  registerUser: (values: IRegisterForm) => Promise<void>;
  loginUser: (values: ILoginForm) => Promise<void>;
  logoutUser: () => void;
}
