import { assets } from "../assets/admin-assets/data";
import useAuthContext from "../hooks/useAuthContext";

const Navbar: React.FC = () => {
  const { logout } = useAuthContext();

  return (
    <nav className="flex items-center justify-between px-[4%] py-2">
      <img
        src={assets.logo}
        alt="revive logo"
        className="w-[110px] object-contain"
      />
      <button
        onClick={logout}
        className="rounded-full bg-gray-600 px-5 py-2 text-xs text-white hover:opacity-95 sm:px-7 sm:py-2 sm:text-sm"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
