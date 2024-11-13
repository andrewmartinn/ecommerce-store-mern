import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assets } from "../assets/ui-assets/data";
import CartTotal from "../components/CartTotal";
import SectionHeader from "../components/SectionHeader";
import { addressFormSchema, IAddressForm } from "../utils/validator";
import useAuthContext from "../hooks/useAuthContext";
import useShopContext from "../hooks/useShopContext";

interface PaymentOptionProps {
  logo?: string;
  label?: string;
  method: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  logo,
  label,
  method,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      className="flex cursor-pointer items-center gap-3 border p-2 px-3"
      onClick={onSelect}
    >
      <p
        className={`h-3.5 min-w-3.5 rounded-full border ${isSelected ? "bg-green-400" : ""}`}
      ></p>
      {logo ? (
        <img src={logo} alt={`${method} logo`} className="mx-4 h-5" />
      ) : (
        <p className="mx-4 text-sm font-medium uppercase text-gray-500">
          {label}
        </p>
      )}
    </button>
  );
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { cartItems, setCartItems, getCartAmount, deliveryFee, products } =
    useShopContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAddressForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    },
    resolver: zodResolver(addressFormSchema),
  });

  const handleFormSubmit: SubmitHandler<IAddressForm> = async (values) => {
    try {
      const orderItems = [];

      for (const itemsId in cartItems) {
        for (const itemSize in cartItems[itemsId]) {
          // check if product is added in cart with quantity greater 0
          if (cartItems[itemsId][itemSize] > 0) {
            // get product info
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemsId),
            );

            // add quantity and product size
            if (itemInfo) {
              itemInfo.selectedSize = itemSize;
              itemInfo.quantity = cartItems[itemsId][itemSize];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const newOrderData = {
        address: values,
        items: orderItems,
        amount: deliveryFee + getCartAmount(),
      };

      // send api req based on payment method
      switch (selectedPaymentMethod) {
        case "cod": {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/order/cod`,
            newOrderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.data.success) {
            setCartItems({});
            reset();
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="min-h-[80dvh]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-10"
      >
        {/* delivery address form */}
        <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
          <div className="my-3 text-xl sm:text-2xl">
            <SectionHeader primaryTitle="Delivery" accentTitle="Information" />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Street"
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
              {...register("street")}
            />
            {errors.street && (
              <p className="text-sm text-red-400">{errors.street.message}</p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="City"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-sm text-red-400">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="State"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("state")}
              />
              {errors.state && (
                <p className="text-sm text-red-400">{errors.state.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Zip Code"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("zipcode")}
              />
              {errors.zipcode && (
                <p className="text-sm text-red-400">{errors.zipcode.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Country"
                className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                {...register("country")}
              />
              {errors.country && (
                <p className="text-sm text-red-400">{errors.country.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Phone"
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-400">{errors.phone.message}</p>
            )}
          </div>
        </div>
        {/* cart total & payment method selection */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            <SectionHeader primaryTitle="Payment" accentTitle="Method" />
            <div className="flex flex-col gap-3 lg:flex-row">
              <PaymentOption
                method="stripe"
                logo={assets.stripe_logo}
                isSelected={selectedPaymentMethod === "stripe"}
                onSelect={() => setSelectedPaymentMethod("stripe")}
              />
              <PaymentOption
                method="razorpay"
                logo={assets.razorpay_logo}
                isSelected={selectedPaymentMethod === "razorpay"}
                onSelect={() => setSelectedPaymentMethod("razorpay")}
              />
              <PaymentOption
                method="cod"
                label="Cash On Delivery"
                isSelected={selectedPaymentMethod === "cod"}
                onSelect={() => setSelectedPaymentMethod("cod")}
              />
            </div>
            <div className="mt-8 w-full text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black px-16 py-3 text-sm uppercase text-white transition duration-[200ms] ease-in-out hover:opacity-75 disabled:opacity-75 sm:w-fit"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="text-surface inline-block size-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    />
                  </div>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
