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
  bestseller: boolean;
}

export interface ShopContextType {
  currency: string;
  deliveryFee: number;
  products: IProduct[];
}
