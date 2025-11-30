import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#f6f1e9] flex items-center justify-center p-3">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — LOGIN FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#4b3b18] mb-6">Register</h1>

          {/* Name */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#4b3b18]">Name</span>
            <input
              type="text"
              placeholder="Type your name"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
            />
          </label>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#4b3b18]">Email</span>
            <input
              type="email"
              placeholder="Type your email"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
            />
          </label>

          {/* Password */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#4b3b18]">Password</span>
            <input
              type="password"
              placeholder="Type your password"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
            />
          </label>

          {/* Address */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#4b3b18]">Address</span>
            <input
              type="text"
              placeholder="Type your address"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
            />
          </label>

          {/* Phone Number */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#4b3b18]">Phone number</span>
            <input
              type="tel"
              placeholder="Type your phone number"
              className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
            />
          </label>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#c6a84d]" />
              <span className="text-[#4b3b18]">Remember me</span>
            </label>

            <Link to="/" className="text-[#8c6f29] hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#c6a84d] hover:bg-[#b1913e] text-white font-semibold py-2.5 rounded-lg transition">
            Create an account
          </button>

          {/* Separator */}
          <div className="flex items-center gap-4 my-4">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-gray-500">Or</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          <Link
            to="/login"
            relative="path"
            className="w-full block text-center bg-[#e9e3d1] hover:bg-[#ddd4bd] text-[#4b3b18] font-medium py-2.5 rounded-lg transition"
          >
            Log in
          </Link>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="hidden md:block">
          <img
            src="/bg-login.png"
            alt="login background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
