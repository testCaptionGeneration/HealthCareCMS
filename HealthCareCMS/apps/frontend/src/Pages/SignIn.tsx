import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinSchema } from "../../../shared/validation"; 
import { toast } from "react-toastify"; 
import { ZodError } from "zod";  
import InputField from "../Components/InputField";
import UserTypeSelector from "../Components/UserType";
import FormButton from "../Buttons/FormButton";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<{ 
    email: string; 
    password: string; 
    usertype: "doctor" | "patient"; 
  }>({ email: "", password: "", usertype: "doctor" });

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
        `http://localhost:5000/api/${formData.usertype === "doctor" ? "doctors" : "patients"}/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Sign in successful!");
        navigate(formData.usertype === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");
      } else {
        toast.error(data.message || "Sign in failed");
      }
    } catch {
      toast.error("An error occurred during sign in");
    }
  };

  return (
    <div className="flex bg-[#F9FAFB]">
      <div className="relative w-[45%] overflow-hidden">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[720px] w-full" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[500px] w-full object-cover" />
      </div>

      <div className="w-[55%] flex flex-col justify-center items-center px-12">
        <h1 className="text-4xl font-semibold text-[#3B9AB8] mb-8 text-center">Healthcare CMS</h1>

        <UserTypeSelector 
          usertype={formData.usertype} 
          setUsertype={(type) => setFormData((prev) => ({ ...prev, usertype: type as "doctor" | "patient" }))} 
          mode="signin" 
        />

        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          <form className="flex flex-col gap-6">
            <InputField 
              label="Email" 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

            <InputField 
              label="Password" 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

            <FormButton onClick={handleSignIn} text={`Sign In as ${formData.usertype === "doctor" ? "Doctor" : "Patient"}`} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
