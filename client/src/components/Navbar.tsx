import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/ui-assets/data";
import { useState } from "react";
import useShopContext from "../hooks/useShopContext";
import useAuthContext from "../hooks/useAuthContext";

interface NavLink {
  id: number;
  name: string;
  url: string;
}

const navlinks: NavLink[] = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Collection", url: "/collection" },
  { id: 3, name: "About", url: "/about" },
  { id: 4, name: "Contact", url: "/contact" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logoutUser } = useAuthContext();
  const { setShowSearchBar, getCartCount, setCartItems } = useShopContext();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setCartItems({});
  };

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      {/* logo image */}
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="revive logo"
          className="w-[110px] object-contain"
        />
      </Link>
      {/* desktop nav */}
      <ul className="hidden items-center gap-5 text-sm text-gray-700 sm:flex">
        {navlinks.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className="flex flex-col items-center gap-1"
          >
            <p className="uppercase">{item.name}</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>
        ))}
      </ul>
      {/* nav actions */}
      <div className="flex items-center gap-6">
        {location.pathname === "/collection" && (
          <img
            src={assets.search_icon}
            alt="product search icon"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearchBar(true)}
          />
        )}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="user profile menu icon"
            className="w-5 cursor-pointer"
          />

          {token && (
            <div className="dropdown-menu absolute right-0 hidden pt-4 group-hover:block">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="cart icon" className="w-5 min-w-5" />
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt="sidebar icon"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setIsSidebarActive(true)}
        />
      </div>
      {/* sidebar menu */}
      <div
        className={`absolute bottom-0 right-0 top-0 overflow-hidden bg-white shadow-md transition-all ${isSidebarActive ? "w-3/4" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex cursor-pointer items-center gap-4 p-3"
            onClick={() => setIsSidebarActive(false)}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p className="text-gray-500 hover:text-black">Back</p>
          </div>
          <div className="flex flex-col divide-y-2 divide-slate-400/[.24]">
            {navlinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={() => setIsSidebarActive(false)}
                className="py-2 pl-6 uppercase"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
