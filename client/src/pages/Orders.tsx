import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import useAuthContext from "../hooks/useAuthContext";
import useShopContext from "../hooks/useShopContext";
import axios from "axios";
import { IUserOrder, OrderItem } from "../types";

const Orders: React.FC = () => {
  const { token } = useAuthContext();
  const { currency } = useShopContext();

  const [orderData, setOrderData] = useState<OrderItem[]>([]);

  const fetchOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/order/user/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const userOrders = response.data.userOrders;
        const allOrderItems: OrderItem[] = [];

        // create seperate order item object
        userOrders.map((order: IUserOrder) => {
          order.items.map((item: OrderItem) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });

        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.error("Unable to load orders: ", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="border-t pt-10">
      <div className="text-xl sm:text-2xl">
        <SectionHeader primaryTitle="My" accentTitle="Orders" />
      </div>
      {/* orders history list */}
      <div>
        {orderData.length === 0 ? (
          <div className="flex min-h-[50dvh] items-center justify-center">
            <p className="text-center text-2xl font-bold">No Orders to Show</p>
          </div>
        ) : (
          orderData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
            >
              {/* product info */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image[0]}
                  alt={`${item.name} image`}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  <div className="mt-1 flex items-center gap-3 text-base text-gray-700">
                    <p className="text-base">
                      {currency} {item.price}
                    </p>
                    <p className="text-base">Quantity: {item.quantity}</p>
                    <p className="text-base">Size: {item.selectedSize}</p>
                  </div>
                  <p className="mt-1">
                    Order Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              {/* order status */}
              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={fetchOrderData}
                  className="rounded-sm border px-4 py-2 text-sm font-medium"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Orders;
