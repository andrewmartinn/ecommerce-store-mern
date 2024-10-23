import { Link } from "react-router-dom";
import { IProduct } from "../types";
import useShopContext from "../hooks/useShopContext";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { currency } = useShopContext();

  return (
    <Link to={`/product/${product._id}`} className="text-gray-700">
      <div className="overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="transition ease-in-out hover:scale-110"
        />
        <p className="pb-1 pt-3 text-sm">{product.name}</p>
        <p className="text-sm font-medium">
          {currency} {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
