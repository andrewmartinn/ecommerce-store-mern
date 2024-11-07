import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm, loginFormSchema } from "../utils/validator";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { token, loginUser, error } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleFormSubmit: SubmitHandler<ILoginForm> = async (values) => {
    try {
      await loginUser(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-2 mt-10 inline-flex items-center justify-center gap-2">
        <p className="font-prata text-3xl">Login</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-800 px-3 py-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="password"
            className="w-full border border-gray-800 px-3 py-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-[-8px] flex w-full flex-col justify-between gap-3 text-sm sm:flex-row sm:gap-0">
          <p className="cursor-pointer text-gray-800 hover:underline">
            Forgot your password?
          </p>

          <p
            className="cursor-pointer text-gray-800 hover:underline"
            onClick={() => setCurrentView("Sign Up")}
          >
            Create account
          </p>
        </div>
        {error && <p className="my-1 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-black px-8 py-2 font-light text-white hover:opacity-70 disabled:opacity-60"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
