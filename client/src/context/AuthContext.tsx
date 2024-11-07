import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContextType } from "../types";
import { ILoginForm, IRegisterForm } from "../utils/validator";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("token") || null;
    if (storedAuthToken) {
      setError(null);
      setToken(storedAuthToken);
    } else {
      setError(null);
      setToken(null);
    }
  }, []);

  const registerUser = async (values: IRegisterForm): Promise<void> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/register`,
        values,
      );

      if (response.data.success) {
        const authToken = response.data.token;
        setToken(authToken);
        setError(null);
        localStorage.setItem("token", authToken);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("User Registration Error: ", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  const loginUser = async (values: ILoginForm): Promise<void> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
        values,
      );

      if (response.data.success) {
        const authToken = response.data.token;
        setToken(authToken);
        setError(null);
        localStorage.setItem("token", authToken);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("User Login Error: ", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setError(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, loginUser, logoutUser, registerUser, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
