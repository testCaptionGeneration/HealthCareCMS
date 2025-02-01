import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CheckType = "doctor" | "patient";

const SignUp: React.FC = () => {
  const [usertype, setUsertype] = useState<CheckType>("doctor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");  // Only for doctor
  const [dof, setDof] = useState("");  // Doctor's degree
  const [hospital, setHospital] = useState("");  // Hospital name
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleSignUp = async () => {
    try {
     
      const payload = {
        fullName,
        email,
        phone,
        password,
        hospital,
        ...(usertype === "doctor" && { position, dof, hospital }), 
      };

      
      const endpoint = usertype === "doctor" ? "/api/doctors/signup" : "/api/patients/signup";

      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("usertype", usertype);  
        navigate("/sign-in");  
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);  
      }
    } catch (err) {
      console.error("Sign-up failed", err);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      {/* Left Section (Image) */}
      <div className="relative w-[45%] overflow-hidden">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[720px] w-full" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[500px] w-full object-cover" />
      </div>

      {/* Right Section (Form) */}
      <div className="w-[55%] flex flex-col justify-center items-center px-12">
        <h1 className="text-4xl font-semibold text-[#3B9AB8] mb-8 text-center">Healthcare CMS</h1>

        {/* Toggle User Type */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "doctor" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
            onClick={() => setUsertype("doctor")}
          >
            Doctor Sign Up
          </button>
          <button
            className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "patient" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
            onClick={() => setUsertype("patient")}
          >
            Patient Sign Up
          </button>
        </div>

        {/* Sign-Up Form */}
        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">
            {usertype === "doctor" ? "Doctor Sign-Up Form" : "Patient Sign-Up Form"}
          </h2>
          <form className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Position (for Doctors) */}
            {usertype === "doctor" && (
              <div>
                <label className="text-sm font-medium text-gray-600">Position</label>
                <input
                  type="text"
                  placeholder="Enter your position (e.g., Cardiologist)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            )}

            {/* Education (for Doctors) */}
            {usertype === "doctor" && (
              <div>
                <label className="text-sm font-medium text-gray-600">Degree/Qualification</label>
                <input
                  type="text"
                  placeholder="Enter your education (e.g., MD, MBBS)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                  value={dof}
                  onChange={(e) => setDof(e.target.value)}
                />
              </div>
            )}

            
            <div>
              <label className="text-sm font-medium text-gray-600">Hospital</label>
              <input
                type="text"
                placeholder="Enter the hospital name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign-Up Button */}
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
            >
              {`Sign Up as ${usertype.charAt(0).toUpperCase() + usertype.slice(1)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
