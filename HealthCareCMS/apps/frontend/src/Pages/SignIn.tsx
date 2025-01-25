import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState<"doctor" | "patient">("doctor");
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Simulate user authentication
    const storedUserType = localStorage.getItem("usertype");

    if (storedUserType === usertype) {
      // Redirect to the respective dashboard based on user type
      if (usertype === "doctor") {
        navigate("/doctor-dashboard");
      } else if (usertype === "patient") {
        navigate("/patient-dashboard");
      }
    } else {
      // Handle invalid user type or authentication failure
      alert("Invalid user type or credentials");
    }
  };

  return (
    <div className="flex bg-[#F9FAFB] flex-col lg:flex-row">
      
      <div className="relative w-full lg:w-[45%] overflow-hidden">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[400px] lg:h-[720px] w-full" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[300px] lg:h-[500px] w-full object-cover" />
      </div>

      
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center px-6 lg:px-12 py-8 lg:py-0">
        <h1 className="text-3xl lg:text-4xl font-semibold text-[#3B9AB8] mb-6 lg:mb-8 text-center">Healthcare CMS</h1>

        
        <div className="flex gap-4 mb-6 lg:mb-8 flex-wrap justify-center">
          <button
            className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "doctor" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
            onClick={() => setUsertype("doctor")}
          >
            Doctor Sign In
          </button>
          <button
            className={`px-6 py-3 text-base font-semibold rounded-lg ${usertype === "patient" ? "bg-[#3B9AB8] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"}`}
            onClick={() => setUsertype("patient")}
          >
            Patient Sign In
          </button>
        </div>

        
        <div className="bg-white shadow-lg w-full max-w-md p-6 lg:p-8 rounded-lg">
          {usertype === "doctor" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Doctor Sign-In Form</h2>
              <form className="flex flex-col gap-4">
                {/* Email field */}
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

                
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
                >
                  Sign In as Doctor
                </button>
              </form>
            </div>
          )}

          {usertype === "patient" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Patient Sign-In Form</h2>
              <form className="flex flex-col gap-4">
                
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

                
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
                >
                  Sign In as Patient
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
