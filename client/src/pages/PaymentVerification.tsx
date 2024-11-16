import { useNavigate, useSearchParams } from "react-router-dom";
import useShopContext from "../hooks/useShopContext";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const PaymentVerification: React.FC = () => {
  const navigate = useNavigate();

  const { setCartItems } = useShopContext();

  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");

  const verifyPayment = useCallback(async () => {
    if (!orderId || !success) return;

    if (success === "true") {
      setCartItems({});
      navigate("/orders");
      toast.success("Payment successful");
    } else {
      navigate("/checkout");
      toast.error("Payment failed. Please try again");
    }
  }, [orderId, success, navigate, setCartItems]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return null;
};

export default PaymentVerification;
