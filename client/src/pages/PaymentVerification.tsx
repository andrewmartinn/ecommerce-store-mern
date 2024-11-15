import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useShopContext from "../hooks/useShopContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const PaymentVerification: React.FC = () => {
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const { setCartItems } = useShopContext();

  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const verifyPayment = useCallback(async () => {
    if (!orderId || !success) {
      setError("Invalid request parameters");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/order/stripe-verify`,
        {
          orderId,
          success,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while verifying the payment.");
    } finally {
      setLoading(false);
    }
  }, [orderId, success, token, navigate, setCartItems]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  if (loading) {
    return (
      <section className="flex min-h-[70dvh] items-center justify-center">
        <h2 className="text-2xl font-bold">Verifiying Payment...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center text-center">
        <h2 className="text-xl font-medium text-red-500">{error}</h2>
      </section>
    );
  }

  return <section>Payment Verified</section>;
};

export default PaymentVerification;
