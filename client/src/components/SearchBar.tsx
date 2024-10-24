import { assets } from "../assets/ui-assets/data";
import useShopContext from "../hooks/useShopContext";

const SearchBar: React.FC = () => {
  const { setSearchTerm, showSearchBar, setShowSearchBar } = useShopContext();

  return (
    showSearchBar && (
      <div className="border-t text-center">
        <div className="mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2 sm:w-1/2">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 bg-inherit text-sm outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={assets.search_icon} alt="search icon" className="w-4" />
        </div>
        <img
          src={assets.cross_icon}
          alt="search close icon"
          className="inline w-3 cursor-pointer"
          onClick={() => {
            setSearchTerm("");
            setShowSearchBar(false);
          }}
        />
      </div>
    )
  );
};
export default SearchBar;
