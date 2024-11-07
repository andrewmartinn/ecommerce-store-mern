import { useEffect, useState } from "react";
import useShopContext from "../hooks/useShopContext";
import { IProduct } from "../types";
import SectionHeader from "./SectionHeader";
import ProductItem from "./ProductItem";

const BestSeller: React.FC = () => {
  const { products } = useShopContext();
  const [bestSellerProducts, setBestSellerProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const productsList = products.filter((item) => item.bestSeller);
    setBestSellerProducts(productsList.slice(0, 5));
  }, [products]);

  return (
    <section className="my-10">
      <div className="py-8 text-center text-2xl sm:text-3xl">
        <SectionHeader primaryTitle="Best" accentTitle="Sellers" />
        <p className="m-auto text-xs text-gray-600 sm:w-3/4 sm:text-sm md:text-base">
          Explore our most popular picks and see what's trending right now.
        </p>
      </div>
      {/* bestsellers list */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellerProducts &&
          bestSellerProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
      </div>
    </section>
  );
};

export default BestSeller;
