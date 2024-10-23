import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import SectionHeader from "./SectionHeader";
import { IProduct } from "../types";
import useShopContext from "../hooks/useShopContext";

const LatestCollection: React.FC = () => {
  const { products } = useShopContext();
  const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="my-10">
      <div className="py-8 text-center text-2xl sm:text-3xl">
        <SectionHeader primaryTitle="Latest" accentTitle="Collections" />
        <p className="m-auto text-xs text-gray-600 sm:w-3/4 sm:text-sm md:text-base">
          Discover our newest arrivals and latest fashion trends you'll love.
        </p>
      </div>
      {/* latest collections list */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts &&
          latestProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
      </div>
    </section>
  );
};

export default LatestCollection;
