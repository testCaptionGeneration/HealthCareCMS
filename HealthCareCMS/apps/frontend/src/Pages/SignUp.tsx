// pages/SignUp.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import FormButton from "../Buttons/FormButton";
import UserTypeSelector from "../Components/UserType";

const SignUp: React.FC = () => {
  const [usertype, setUsertype] = useState<"doctor" | "patient">("doctor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const[dof,setdof]=useState("")
  const[hospital,sethospital]=useState("") 
  const navigate = useNavigate();

  const handleSignUp = () => {
    localStorage.setItem("usertype", usertype);
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F9FAFB] min-h-screen">
      <div className="relative w-full md:w-[45%] overflow-hidden bg-gradient-to-b from-[#3B9AB8] to-[#54B9ED] md:bg-none">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[400px] md:h-[720px] w-full hidden md:block" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[300px] md:h-[500px] w-full object-cover hidden md:block" />
      </div>

      <div className="w-full md:w-[55%] flex flex-col justify-center items-center px-8 md:px-12 py-8 md:py-0">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#3B9AB8] mb-6 md:mb-8 text-center">Healthcare CMS</h1>

        <UserTypeSelector mode='signup'usertype={usertype} setUsertype={setUsertype} />

        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          {usertype === "doctor" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Doctor Sign-Up Form</h2>
              <form className="flex flex-col gap-4">
                <InputField
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                />
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <InputField
                  label="Phone Number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                <InputField
                  label="Position"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Enter Your Position (e.g., General Practitioner)"
                />
                <InputField
                  label="Education"
                  type="text"
                  value={dof}
                  onChange={(e) => setdof(e.target.value)}
                  placeholder="Enter Your Education (e.g.,MBBS)"
                />
                <InputField
                  label="Hospital"
                  type="text"
                  value={hospital}
                  onChange={(e) => sethospital(e.target.value)}
                  placeholder="Enter Your Education (e.g.,MBBS)"
                />
                <FormButton onClick={handleSignUp} text="Sign Up as Doctor" />
              </form>
            </div>
          )}

          {usertype === "patient" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Patient Sign-Up Form</h2>
              <form className="flex flex-col gap-4">
                <InputField
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                />
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <InputField
                  label="Phone Number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                <InputField
                  label="Hospital"
                  type="text"
                  value={hospital}
                  onChange={(e) => sethospital(e.target.value)}
                  placeholder="Enter Your Desired Hospital"
                />
                <FormButton onClick={handleSignUp} text="Sign Up as Patient" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;