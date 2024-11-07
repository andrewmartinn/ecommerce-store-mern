import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegisterForm, registerFormSchema } from "../utils/validator";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm: React.FC<LoginFormProps> = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { registerUser, error } = useAuthContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const handleFormSubmit: SubmitHandler<IRegisterForm> = async (values) => {
    try {
      await registerUser(values);
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-2 mt-10 inline-flex items-center justify-center gap-2">
        <p className="font-prata text-3xl">Register</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-800 px-3 py-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
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
            onClick={() => setCurrentView("Login")}
          >
            Have an account? Login here
          </p>
        </div>
        {error && <p className="my-1 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-black px-8 py-2 font-light text-white hover:opacity-70 disabled:opacity-60"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
