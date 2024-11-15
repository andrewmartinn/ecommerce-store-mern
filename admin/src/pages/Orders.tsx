import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";
import { IOrder } from "../types";
import { assets } from "../assets/admin-assets/data";

const Orders: React.FC = () => {
  const { token } = useAuthContext();
  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchAllOrders = useCallback(async () => {
    if (!token) return null;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/order/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setOrders(response.data.allOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const handleUpdateOrderStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    orderId: string,
  ) => {
    console.log("select value: ", e.target.value);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/order/status`,
        {
          orderId,
          orderStatus: e.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <section>
      <h3>Orders</h3>
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="my-3 grid grid-cols-1 items-start gap-3 border border-gray-200 p-5 text-xs text-gray-700 sm:grid-cols-[0.5fr_2fr_2fr] sm:text-sm md:my-4 md:p-8 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]"
          >
            <img src={assets.parcel_icon} alt="orders icon" className="w-12" />
            <div>
              <div>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return (
                      <p key={idx} className="py-0.5">
                        {item.name} x {item.quantity}{" "}
                        <span>{item.selectedSize}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={idx} className="py-0.5">
                        {item.name} x {item.quantity}{" "}
                        <span>{item.selectedSize}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mb-2 mt-3 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street} ,</p>
                <p>
                  {order.address.city} , {order.address.state} ,{" "}
                  {order.address.country}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.amount}</p>
            <select
              className="p-2 font-semibold"
              onChange={(e) => handleUpdateOrderStatus(e, order._id)}
              value={order.status}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
