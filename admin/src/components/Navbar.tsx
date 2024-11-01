import { assets } from "../assets/admin-assets/data";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} alt="revive logo" className="w-[145px]" />
      <button className="rounded-full bg-gray-600 px-5 py-2 text-xs text-white sm:px-7 sm:py-2 sm:text-sm">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
