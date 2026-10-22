import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Auth } from "../../redux/slice/auth/authSlice";
import "../../components/Forms/Forms.css";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.authSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (localStorage.getItem("token")) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await dispatch(Auth(data));
    if (Auth.fulfilled.match(result) && localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  };

  const pending = isLoading === "Pending";

  return (
    <section className="min-h-screen px-4 flex items-center justify-center bg-Orange_97 relative overflow-hidden">
      <Toaster position="top-right" />
      <img
        src="/assets/images/Abstract Design.webp"
        alt=""
        className="absolute top-0 left-0 w-40 md:w-64 opacity-90 pointer-events-none"
      />
      <img
        src="/assets/images/Abstract Design-01.webp"
        alt=""
        className="absolute bottom-0 right-0 w-40 md:w-64 rotate-180 opacity-90 pointer-events-none"
      />
      <div className="relative w-full max-w-md bg-white border-2 border-Grey_15 rounded-xl shadow-[6px_6px_0_#262626] p-6 md:p-8">
        <div className="flex justify-center">
          <span className="bg-primary border-2 border-Grey_15 rounded-lg px-4 py-2">
            <img src="/assets/Logo.png" className="h-7 w-auto" alt="Little Learners" />
          </span>
        </div>
        <h1 className="text-[24px] font-[800] text-dimBlack mt-6 text-center">Welcome back</h1>
        <p className="text-[14px] text-Grey_40 text-center mt-1 mb-6">
          Sign in to manage the academy website content.
        </p>
        <form className="student-form-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group full-width">
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-400">{errors.email.message}</span>}
          </div>
          <div className="form-group full-width">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <span className="text-red-400">{errors.password.message}</span>}
          </div>
          <button type="submit" className="submit-button" disabled={pending}>
            {pending && <span className="btn-spinner" />}
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
