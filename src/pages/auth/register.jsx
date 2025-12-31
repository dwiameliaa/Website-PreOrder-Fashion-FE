import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, useDecodeToken } from "../../_services/auth";

export default function Register() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodeToken(token);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(formData);
      alert("Success! Your account is ready. Login to get started.");
      navigate("/login");
    } catch (error) {
      // console.error("Register error:", error);

      const data = error?.response?.data;
      let message = "An unknown error occurred";

      // Cek apakah ada pesan error untuk email
      if (data?.email) {
        message = data.email.join(" "); // kalau bentuknya array
      } else if (error?.message) {
        message = error.message;
      }

      setError(message);
    }
  };

  useEffect(() => {
    if (token && decodedData && decodedData.success) {
      navigate("/");
    }
  }, [token, decodedData, navigate]);

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex items-center justify-center p-3">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — LOGIN FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#4b3b18] mb-6">Daftar</h1>
          {error && <div className="text-red-500 text-sm pb-3">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            {/* Name */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-[#4b3b18]">Nama</span>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama"
                className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
              />
            </label>

            {/* Email */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-[#4b3b18]">Email</span>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
              />
            </label>

            {/* Password */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-[#4b3b18]">
                Kata Sandi
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi"
                className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
              />
            </label>

            {/* Address */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-[#4b3b18]">
                Alamat
              </span>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan alamat"
                className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
              />
            </label>

            {/* Phone Number */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-[#4b3b18]">
                Telepon
              </span>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukkan telepon"
                className="mt-1 w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c6a84d] outline-none"
              />
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#c6a84d] hover:bg-[#b1913e] text-white font-semibold py-2.5 rounded-lg transition"
            >
              Buat akun
            </button>

            {/* Separator */}
            <div className="flex items-center gap-4 my-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-gray-500">Atau</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <Link
              to="/login"
              relative="path"
              className="w-full block text-center bg-[#e9e3d1] hover:bg-[#ddd4bd] text-[#4b3b18] font-medium py-2.5 rounded-lg transition"
            >
              Masuk
            </Link>
          </form>
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
