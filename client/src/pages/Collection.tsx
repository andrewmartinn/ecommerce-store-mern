import { useCallback, useEffect, useState } from "react";
import { assets } from "../assets/ui-assets/data";
import SectionHeader from "../components/SectionHeader";
import ProductItem from "../components/ProductItem";
import { IProduct } from "../types";
import useShopContext from "../hooks/useShopContext";

const Collection: React.FC = () => {
  const { products } = useShopContext();

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    if (category.includes(selectedValue)) {
      setCategory((prevState) =>
        prevState.filter((item) => item !== selectedValue),
      );
    } else {
      setCategory((prevState) => [...prevState, selectedValue]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    if (subCategory.includes(selectedValue)) {
      setSubCategory((prevState) =>
        prevState.filter((item) => item !== selectedValue),
      );
    } else {
      setSubCategory((prevState) => [...prevState, selectedValue]);
    }
  };

  const sortProducts = useCallback(
    (productsToSort: IProduct[]) => {
      const allFilteredProducts = [...productsToSort];
      let sortedProducts;

      switch (sortType) {
        case "low-high":
          sortedProducts = allFilteredProducts.sort(
            (a, b) => a.price - b.price,
          );
          break;
        case "high-low":
          sortedProducts = allFilteredProducts.sort(
            (a, b) => b.price - a.price,
          );
          break;
        default:
          sortedProducts = allFilteredProducts;
          break;
      }

      setFilteredProducts(sortedProducts);
    },
    [sortType],
  );

  const applyFilter = useCallback(() => {
    let allProducts = products.slice();
    if (category.length > 0) {
      allProducts = allProducts.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      allProducts = allProducts.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    setFilteredProducts(allProducts);
    sortProducts(allProducts);
  }, [category, subCategory, products, sortProducts]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <section className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
      {/* filters */}
      <div className="min-w-60">
        <p
          className="my-2 flex cursor-pointer items-center gap-2 text-xl uppercase sm:my-0 sm:mb-2"
          onClick={() => setShowFilter((prevState) => !prevState)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt="category filter dropdown icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Category</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              <p>Men</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              <p>Women</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <p>Kids</p>
            </div>
          </div>
        </div>
        {/* subcategory filter */}
        <div
          className={`my-5 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <p>Topwear</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <p>Bottomwear</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <p>Winterwear</p>
            </div>
          </div>
        </div>
      </div>
      {/* products list */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between text-base sm:text-2xl">
          <SectionHeader
            primaryTitle="All"
            accentTitle="Collections"
            isCollectionsPage
          />
          {/* sort filter */}
          <select
            className="cursor-pointer border border-gray-300 px-2 py-2 text-sm"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to high</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        {/* products grid */}
        <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
