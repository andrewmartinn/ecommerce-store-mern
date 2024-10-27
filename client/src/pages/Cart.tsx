import { useEffect, useState } from "react";
import useShopContext from "../hooks/useShopContext";
import SectionHeader from "../components/SectionHeader";
import { assets } from "../assets/ui-assets/data";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

interface ICartProduct {
  _id: string;
  size: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateCartItemQuantity } =
    useShopContext();
  const [cartData, setCartData] = useState<ICartProduct[]>([]);

  useEffect(() => {
    const cartProducts = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          cartProducts.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    setCartData(cartProducts);
    console.log("Cart products: ", cartProducts);
  }, [cartItems]);

  return (
    <section className="border-t pt-14">
      <div className="mb-3 text-xl sm:text-2xl">
        <SectionHeader primaryTitle="Your" accentTitle="Cart" />
      </div>
      {/* cart items list */}
      <div>
        {cartData &&
          cartData.map((item, idx) => {
            const productData = products.find(
              (product) => product._id === item._id,
            );
            return (
              <div
                key={idx}
                className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-b py-4 text-gray-700 sm:grid-cols-[4fr_2fr_0.5fr]"
              >
                {/* product name, image and size */}
                <div className="flex items-start gap-6">
                  <img
                    src={productData?.image[0]}
                    alt={productData?.name}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="text-sm font-medium sm:text-lg">
                      {productData?.name}
                    </p>
                    <div className="mt-2 flex items-center gap-5">
                      <p>
                        {currency} {productData?.price}
                      </p>
                      <p className="border bg-slate-100 px-2 sm:px-3 sm:py-1">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="max-w-10 border px-1 py-1 sm:max-w-20 sm:px-2"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateCartItemQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                        )
                  }
                />
                <img
                  src={assets.bin_icon}
                  alt="delete product icon"
                  className="mr-4 w-4 cursor-pointer sm:w-5"
                  onClick={() => updateCartItemQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })}
      </div>
      <div className="my-20 flex justify-end">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              disabled={cartData.length === 0}
              onClick={() => cartData.length > 0 && navigate("/checkout")}
              className={`my-8 bg-black px-8 py-3 uppercase text-white ${cartData.length > 0 ? "hover:opacity-80" : "cursor-not-allowed disabled:opacity-40"}`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
