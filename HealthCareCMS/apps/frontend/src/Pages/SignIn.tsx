// pages/SignIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import FormButton from "../Buttons/FormButton";
import UserTypeSelector from "../Components/UserType";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState<"doctor" | "patient">("doctor");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const credentials = { email, password };
  
    try {
      const response = await fetch(`http://localhost:5000/api/${usertype}s/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Store token in localStorage
  
        if (usertype === "doctor") {
          navigate("/doctor-dashboard");
        } else if (usertype === "patient") {
          navigate("/patient-dashboard");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An error occurred during sign-in.");
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row bg-[#F9FAFB] min-h-screen">
      <div className="relative w-full md:w-[45%] overflow-hidden bg-gradient-to-b from-[#3B9AB8] to-[#54B9ED] md:bg-none">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[400px] md:h-[720px] w-full hidden md:block md:bg-blue-600" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[300px] md:h-[500px] w-full object-cover hidden md:block" />
      </div>

      <div className="w-full md:w-[55%] flex flex-col justify-center items-center px-8 md:px-12 py-8 md:py-0">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#3B9AB8] mb-6 md:mb-8 text-center">Healthcare CMS</h1>

        <UserTypeSelector mode='signup'usertype={usertype} setUsertype={setUsertype} />

        <div className="bg-white shadow-lg w-full max-w-md p-6 md:p-8 rounded-lg">
          {usertype === "doctor" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Doctor Sign-In Form</h2>
              <form className="flex flex-col gap-4">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FormButton onClick={handleSignIn} text="Sign In as Doctor" />
              </form>
            </div>
          )}

          {usertype === "patient" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Patient Sign-In Form</h2>
              <form className="flex flex-col gap-4">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FormButton onClick={handleSignIn} text="Sign In as Patient" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;