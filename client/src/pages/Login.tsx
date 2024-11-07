import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import useAuthContext from "../hooks/useAuthContext";

const Login: React.FC = () => {
  const { setError } = useAuthContext();
  const [currentView, setCurrentView] = useState("Login");

  useEffect(() => {
    setError(null);
  }, [currentView, setError]);

  return (
    <section className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96">
      {currentView === "Login" && <LoginForm setCurrentView={setCurrentView} />}
      {currentView === "Sign Up" && (
        <RegisterForm setCurrentView={setCurrentView} />
      )}
    </section>
  );
};

export default Login;
