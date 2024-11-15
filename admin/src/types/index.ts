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

interface IOrderItem extends IProduct {
  selectedSize: string;
  quantity: number;
}

interface IAddress {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  amount: number;
  address: IAddress;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
}
