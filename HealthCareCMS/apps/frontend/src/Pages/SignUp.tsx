import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorSignupSchema, patientSignupSchema } from "../../../shared/validation";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import InputField from "../Components/InputField";
import UserTypeSelector from "../Components/UserType";
import FormButton from "../Buttons/FormButton";
import { LogoIcon } from "../Icons/LogoIcon";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    dof: "",
    hospital: "",
    password: "",
    usertype: "doctor" as "doctor" | "patient",
    dob: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading ,isLoading]=useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "dob" && e.target.value > today) {
      toast.error("Date of Birth cannot be in the future.");
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = async () => {
    try {
      const schema = formData.usertype === "doctor" ? doctorSignupSchema : patientSignupSchema;
      await schema.parseAsync(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path && err.path[0]) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSignUp = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      isLoading(true);
      const endpoint = formData.usertype === "doctor" ? "/api/doctors/signup" : "/api/patients/signup";

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Sign up successful!");
        navigate("/sign-in");
      } else {
        const error = await response.json();
        toast.error(error.message || "Sign up failed");
      }
    } catch {
      toast.error("An error occurred during sign up");
    }
    finally{
      isLoading(false);
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <div className="relative w-[45%] h-[950px]">
        <div className="absolute inset-0">
          <img src="/assets/images/Signup_bg.png" alt="Frame" className="min-h-full min-w-screen object-cover opacity-70" />
        </div>
      </div>

      <div className="min-w-screen flex flex-col justify-center items-center px-12 absolute py-5">
        <div className="flex items-center justify-center mb-2">
          <LogoIcon size={28.85} />
          <h1 className="lg:text-4xl sm:text-2xl font-semibold text-[#3B9AB8] text-center">Healthcare CMS</h1>
        </div>

        <div className="mb-4 text-center">
          <p className="lg:text-md font-bold sm:sm">
            Already have an account?{" "}
            <button onClick={() => navigate("/sign-in")} className="text-[#3B9AB8] font-normal hover:scale-110 hover:underline cursor-pointer">
              Sign In here
            </button>
          </p>
        </div>

        <UserTypeSelector
          usertype={formData.usertype}
          setUsertype={(type) => setFormData({ ...formData, usertype: type as "doctor" | "patient" })}
          mode="signup"
        />

        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            
            <InputField label="Full Name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}

            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <InputField label="Phone" type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

            {formData.usertype === "doctor" && (
              <>
                <InputField label="Position" type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Enter your position" />
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}

                <InputField label="Degree/Field" type="text" name="dof" value={formData.dof} onChange={handleChange} placeholder="Enter your degree or field" />
                {errors.dof && <p className="text-red-500 text-sm mt-1">{errors.dof}</p>}
              </>
            )}

            <div className="relative">
              <InputField label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 transform -translate-y-1/2 text-gray-600 focus:outline-none">
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            {formData.usertype === "doctor" && <InputField label="Hospital" type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Enter hospital name" />}
            {formData.usertype === "patient" && (
              <InputField
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={today}
                placeholder="Enter your date of birth"
              />
            )}
            {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}

            <FormButton onClick={handleSignUp} text={`Sign Up as ${formData.usertype.charAt(0).toUpperCase() + formData.usertype.slice(1)}`}  isLoading={loading}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
