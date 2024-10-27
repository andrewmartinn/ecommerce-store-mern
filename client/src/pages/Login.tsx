import { useState } from "react";

const Login: React.FC = () => {
  const [currentView, setCurrentView] = useState("Login");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96"
    >
      <div className="mb-2 mt-10 inline-flex items-center gap-2">
        <p className="font-prata text-3xl">{currentView}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentView !== "Login" && (
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-800 px-3 py-2"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-800 px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-800 px-3 py-2"
        required
      />
      <div className="mt-[-8px] flex w-full justify-between text-sm">
        {currentView === "Login" && (
          <p className="cursor-pointer text-gray-800 hover:underline">
            Forgot your password?
          </p>
        )}
        {currentView === "Login" ? (
          <p
            className="cursor-pointer text-gray-800 hover:underline"
            onClick={() => setCurrentView("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer text-gray-800 hover:underline"
            onClick={() => setCurrentView("Login")}
          >
            Have an account? Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 bg-black px-8 py-2 font-light text-white hover:opacity-70"
      >
        {currentView}
      </button>
    </form>
  );
};

export default Login;
