import { ILoginForm } from "../utils/validator";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (values: ILoginForm) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

type Category = "Men" | "Women" | "Kids";

type SubCategory = "Topwear" | "Bottomwear" | "Winterwear";

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
}
