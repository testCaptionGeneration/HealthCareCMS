import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CheckType = "doctor" | "patient";

const Signup: React.FC = () => {
  const [usertype, setUsertype] = useState<CheckType>("doctor");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem("usertype", usertype);
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F9FAFB]">
      <div className="relative w-full md:w-[45%] overflow-hidden">
        <img src="/assets/images/Frame 5.png" alt="Frame" className="h-[400px] md:h-[720px] w-full" />
        <img src="/assets/images/upper.png" alt="upper" className="absolute bottom-0 left-0 h-[300px] md:h-[500px] w-full object-cover" />
      </div>

      <div className="w-full md:w-[55%] flex flex-col justify-center items-center px-8 md:px-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#3B9AB8] mb-6 md:mb-8 text-center">Healthcare CMS</h1>

        <div className="flex gap-4 mb-6 md:mb-8">
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

        <div className="bg-white shadow-lg w-full max-w-md p-8 rounded-lg">
          {usertype === "doctor" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Doctor Sign-Up Form</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Position</label>
                  <input
                    type="text"
                    placeholder="Enter Your Position (e.g., General Practitioner)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSignup}
                  className="w-full h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
                >
                  Sign Up as Doctor
                </button>
              </form>
            </div>
          )}

          {usertype === "patient" && (
            <div>
              <h2 className="text-2xl font-semibold text-[#3B9AB8] mb-6">Patient Sign-Up Form</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#54B9ED] focus:outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSignup}
                  className="w-full h-12 bg-[#3B9AB8] text-white rounded-lg flex justify-center items-center"
                >
                  Sign Up as Patient
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
