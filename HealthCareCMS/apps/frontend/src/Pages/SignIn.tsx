import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinSchema } from "../../../shared/validation";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import InputField from "../Components/InputField";
import UserTypeSelector from "../Components/UserType";
import FormButton from "../Buttons/FormButton";
import { LogoIcon } from "../Icons/LogoIcon";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    usertype: "doctor" as "doctor" | "patient",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading ,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = async () => {
    try {
      await signinSchema.parseAsync({ email: formData.email, password: formData.password });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path && error.path[0]) {
            formattedErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        toast.error("An unknown error occurred.");
      }
      return false;
    }
  };

  const handleSignIn = async () => {

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/${formData.usertype === "doctor" ? "doctors" : "patients"}/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        }
      );

      const data = await response.json();
      console.log("Full backend response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);

        if (formData.usertype === "doctor" && data.doctor?.id) {
          localStorage.setItem("doctorId", data.doctor.id);
          console.log("Doctor ID stored:", data.doctor.id);
        }

        toast.success("Sign in successful!");
        if (formData.usertype === "doctor") {
          navigate(`/cms/v1/doctor/dashboard/${data.doctor.id}`);
        } else if (formData.usertype === "patient") {
          setTimeout(() => {
            window.location.href = `http://localhost:5174/patient/?temp=${data.patient.phone}`;
          }, 100);
        }
      } else {
        console.log("Backend error message:", data.message);
        setServerError(data.message || "Invalid email or password");
        toast.error(data.message || "Sign in failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      setServerError("An error occurred during sign-in. Please try again.");
      toast.error("An error occurred during sign-in.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen fixed">
      <div className="relative w-[45%] h-[950px]">
        <div className="absolute inset-0">
          <div className="object-cover opacity-70">
            <img src="/assets/images/Signup_bg.png" alt="Frame" className="min-h-screen min-w-screen object-cover" />
          </div>
        </div>
      </div>

      <div className="min-w-screen flex flex-col justify-center items-center px-12 absolute py-10">
        <div className="flex items-center justify-center mb-2">
          <LogoIcon size={28.85} />
          <h1 className="lg:text-4xl sm:text-2xl font-semibold text-[#3B9AB8] text-center">Healthcare CMS</h1>
        </div>

        <div className="mb-4 text-center">
          <p className="lg:text-xl sm:text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-[#3B9AB8] font-normal hover:scale-110 hover:underline cursor-pointer"
            >
              Sign Up here
            </button>
          </p>
        </div>

        <UserTypeSelector
          usertype={formData.usertype}
          setUsertype={(type) => setFormData((prev) => ({ ...prev, usertype: type as "doctor" | "patient" }))}
          mode="signin"
        />

        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 flex items-center bottom-3"
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
            <FormButton
              onClick={handleSignIn}
              text={`Sign In as ${formData.usertype.charAt(0).toUpperCase() + formData.usertype.slice(1)}`}
              isLoading={loading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            {serverError && <p className="text-red-500 font-bold p- rounded text-center mt-2">{serverError}</p>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
 