import { useState } from "react";
import { assets } from "../assets/ui-assets/data";
import CartTotal from "../components/CartTotal";
import SectionHeader from "../components/SectionHeader";
import { useNavigate } from "react-router-dom";

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
  const naviagte = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  return (
    <section className="flex min-h-[80dvh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-10">
      {/* delivery address form */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <SectionHeader primaryTitle="Delivery" accentTitle="Information" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
        />
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
              onClick={() => naviagte("/orders")}
              className="bg-black px-16 py-3 text-sm uppercase text-white"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
