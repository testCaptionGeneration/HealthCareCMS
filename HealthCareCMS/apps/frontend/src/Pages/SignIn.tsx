import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinSchema } from "../../../shared/validation";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import InputField from "../Components/InputField";
import UserTypeSelector from "../Components/UserType";
import FormButton from "../Buttons/FormButton";
import { LogoIcon } from "../Icons/LogoIcon";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    usertype: "doctor" as "doctor" | "patient",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch(
        `http://localhost:3000/api/${formData.usertype === "doctor" ? "doctors" : "patients"}/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        }
      );
        console.log("ress",response);
      const data = await response.json();
      console.log("data",data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Sign in successful!");
        if(formData.usertype==="doctor"){
          console.log("req aayi")
          navigate(`/cms/v1/doctor/dashboard/${data.doctor.id}`);
        }
        else if(formData.usertype==="patient"){
             console.log("patient k liye req aayi")
          console.log("hirre")
          setTimeout(() => {
            window.location.href = `http://localhost:5174/patient/?temp=${data.patient.phone}`;
          }, 100);
          
        }
       
      } else {
        toast.error(data.message || "Sign in failed");
      }
    } catch {
      toast.error("An error occurred during sign in");
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen fixed ">
      <div className="relative w-[45%] h-[950px]">
        <div className="absolute inset-0">
        <div className="object-cover opacity-70  ">
          <img
            src="/assets/images/Signup_bg.png"
            alt="Frame"
            className="min-h-screen  min-w-screen object-cover "
          />
          </div>
        </div>
      </div>
    



      <div className="min-w-screen flex flex-col justify-center items-center px-12 absolute py-10 ">
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

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <FormButton onClick={handleSignIn} text={`Sign In as ${formData.usertype.charAt(0).toUpperCase() + formData.usertype.slice(1)}`} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
