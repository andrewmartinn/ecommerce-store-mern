import { createContext, useEffect, useState } from "react";
import { ILoginForm } from "../utils/validator";
import axios from "axios";
import { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("token") || null;
    if (storedAuthToken) {
      setIsAuthenticated(true);
      setToken(storedAuthToken);
    }
  }, []);

  const login = async (values: ILoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/admin`,
        values,
      );

      if (response.data.success) {
        const authToken = response.data.token;
        setIsAuthenticated(true);
        setToken(authToken);
        setError(null);

        localStorage.setItem("token", authToken);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login Error: ", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  const logout = () => {
    setToken(null);
    setError(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
