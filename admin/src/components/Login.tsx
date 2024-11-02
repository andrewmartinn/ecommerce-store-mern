import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm, loginFormSchema } from "../utils/validator";
import useAuthContext from "../hooks/useAuthContext";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { login, error } = useAuthContext();

  const handleFormSubmit: SubmitHandler<ILoginForm> = async (values) => {
    try {
      await login(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-2 flex min-w-72 flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              placeholder="your@email.com"
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-2 flex min-w-72 flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
