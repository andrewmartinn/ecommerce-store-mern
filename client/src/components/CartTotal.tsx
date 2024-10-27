import useShopContext from "../hooks/useShopContext";
import SectionHeader from "./SectionHeader";

const CartTotal: React.FC = () => {
  const { currency, deliveryFee, getCartAmount } = useShopContext();

  return (
    <div className="w-full">
      <div className="text-xl sm:text-2xl">
        <SectionHeader primaryTitle="Cart" accentTitle="Total" />
      </div>
      <div className="mt-2 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <p>Shipping Charges</p>
          <p>
            {currency} {deliveryFee}.00
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
