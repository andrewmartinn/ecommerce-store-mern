import { useEffect, useState } from "react";
import useShopContext from "../hooks/useShopContext";
import { IProduct } from "../types";
import SectionHeader from "./SectionHeader";
import ProductItem from "./ProductItem";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  subCategory,
}) => {
  const { products } = useShopContext();
  const [relatedItems, setRelatedItems] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let allProducts = products.slice();
      allProducts = allProducts.filter(
        (item) =>
          category === item.category && item.subCategory === subCategory,
      );
      setRelatedItems(allProducts.slice(0, 5));
    }
  }, [category, subCategory, products]);

  return (
    <div className="my-24">
      <div className="py-2 text-center text-xl sm:text-3xl">
        <SectionHeader primaryTitle="Related" accentTitle="Products" />
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {relatedItems.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
