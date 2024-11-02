import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin-assets/data";

interface Link {
  id: number;
  name: string;
  url: string;
  icon: string;
  alt: string;
}

const sidebarLinks: Link[] = [
  {
    id: 1,
    name: "Add Product",
    url: "/add",
    icon: assets.add_icon,
    alt: "add icon",
  },
  {
    id: 2,
    name: "Products List",
    url: "/products",
    icon: assets.order_icon,
    alt: "products list icon",
  },
  {
    id: 3,
    name: "Orders",
    url: "/orders",
    icon: assets.parcel_icon,
    alt: "orders icon",
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen w-[18%] border-r-2">
      <div className="flex flex-col gap-4 pl-[20%] pt-6 text-[15px]">
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className="flex items-center gap-3 rounded-l border border-r-0 border-gray-300 px-3 py-2"
          >
            <img src={item.icon} alt={item.alt} className="size-5" />
            <p className="hidden md:block">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
