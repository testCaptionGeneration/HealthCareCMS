import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorSignupSchema, patientSignupSchema } from "../../../shared/validation";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import InputField from "../Components/InputField";
import UserTypeSelector from "../Components/UserType";
import FormButton from "../Buttons/FormButton";
import { LogoIcon } from "../Icons/LogoIcon";

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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const endpoint = formData.usertype === "doctor" ? "/api/doctors" : "/api/patients";
      const response = await fetch(`http://localhost:3000${endpoint}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Sign up successful!");
       
        const data=await response.json();
        const temp=formData.usertype==="doctor"?data.doctor.id:data.phone;
        console.log("temp phonen",temp);
        console.log("pateint number :", temp);
       window.location.href=`http://localhost:5174/patient/?${temp}`;
      } else {
        const error = await response.json();
        toast.error(error.message || "Sign up failed");
      }
    } catch {
      toast.error("An error occurred during sign up");
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <div className="relative w-[45%] h-[950px]">
        <div className="absolute inset-0">
          <img
            src="/assets/images/Signup_bg.png"
            alt="Frame"
            className="min-h-full min-w-screen object-cover opacity-50 "
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[635px]">
          
        </div>
      </div>

      <div className="min-w-screen flex flex-col justify-center items-center px-12 absolute py-5">
        <div className="flex items-center justify-center mb-2">
          <LogoIcon size={28.85}/>
        
        <h1 className="lg:text-4xl sm:text-2xl font-semibold text-[#3B9AB8]  text-center">Healthcare CMS</h1>
        
        </div>
        <div className="mb-4 text-center">
          <p className="lg:text-xl sm:sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sign-in")}
              className="text-[#3B9AB8] font-normal hover:scale-110 hover:underline cursor-pointer"
            >
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
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}

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
              label="Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

            {formData.usertype === "doctor" && (
              <>
                <InputField
                  label="Position"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter your position"
                 
                />
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}

                <InputField
                  label="Degree/Field"
                  type="text"
                  name="dof"
                  value={formData.dof}
                  onChange={handleChange}
                  placeholder="Enter your degree or field"
                  
                />
                {errors.dof && <p className="text-red-500 text-sm mt-1">{errors.dof}</p>}
              </>
            )}

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <InputField
              label="Hospital"
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="Enter hospital name"
             
            />
            {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}

            <FormButton onClick={handleSignUp} text={`Sign Up as ${formData.usertype.charAt(0).toUpperCase() + formData.usertype.slice(1)}`} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
