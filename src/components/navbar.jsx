import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changePassword, logout } from "../_services/auth";
import { updateProfile } from "../_services/users";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAuthenticated = token && userInfo;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    _method: "PUT",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Pre-Order", path: "/measurements" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // mengunci scroll ketika modal terbuka
  useEffect(() => {
    if (editProfileOpen || changePasswordOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [editProfileOpen, changePasswordOpen]);

  const openEditProfileModal = () => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
        _method: "PUT",
      });
    }
    setEditProfileOpen(true);
  };

  useEffect(() => {
    const close = () => setProfileMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await updateProfile(formData);

      // update localStorage
      localStorage.setItem("userInfo", JSON.stringify(res.data.data));

      setEditProfileOpen(false);
      alert("Profil berhasil diperbarui");
    } catch (error) {
      console.log(error.response?.data);
      alert("Gagal memperbarui profil");
    }
  };

  const toggleMenu = () => setOpen(!open);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (!confirmLogout) return;

    if (token) {
      await logout({ token });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
    }

    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
        setOpen(false);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ganti password
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    if (!passwordData.old_password) {
      return alert("Kata sandi saat ini wajib diisi");
    }

    if (passwordData.new_password.length < 8) {
      return alert("Kata sandi baru harus terdiri dari minimal 8 karakter");
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      return alert("Konfirmasi kata sandi tidak sesuai");
    }

    try {
      await changePassword({
        old_password: passwordData.old_password,
        password: passwordData.new_password,
        password_confirmation: passwordData.confirm_password,
      });

      setChangePasswordOpen(false);
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });

      alert("Kata sandi berhasil diperbarui. Silakan masuk kembali.");

      // Logout user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengubah kata sandi");
    }
  };

  return (
    <nav
      className={`fixed w-full z-20 transition-all ${
        scrolled
          ? "py-4 shadow bg-white/70 backdrop-blur-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-10 flex items-center">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-xl lg:text-2xl font-bold">Azmya Fashion</h1>
        </div>

        {/* MENU TENGAH */}
        <ul className="hidden lg:flex gap-10 font-semibold absolute left-1/2 -translate-x-1/2">
          {[
            { name: "Beranda", path: "/" },
            { name: "Pre-Order", path: "/measurements" },
            { name: "Produk", path: "/products" },
            { name: "Pesananku", path: "/my-orders" },
            { name: "Kontak", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`transition ${
                  location.pathname === item.path
                    ? "text-[#c6a84d] underline"
                    : "hover:text-[#c6a84d]"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* KANAN */}
        <div className="ml-auto flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl font-semibold text-[#4b3b18]
                           hover:bg-[#f6f1e9] transition"
              >
                Masuk
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className="px-5 py-2 rounded-xl font-semibold text-white
                           bg-[#c6a84d] hover:bg-[#b1913e] transition"
              >
                Daftar
              </Link>
            </>
          ) : (
            <>
              {/* PROFILE */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileMenuOpen(!profileMenuOpen);
                  }}
                  className="px-5 py-2 rounded-full bg-[#c6a84d]
           text-white font-semibold hover:bg-[#b1913e] transition"
                >
                  {userInfo.name}
                </button>

                {/* DROPDOWN */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                    <button
                      onClick={openEditProfileModal}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏️ Edit Profil
                    </button>

                    <button
                      onClick={() => {
                        setChangePasswordOpen(true);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      🔒 Ganti Kata Sandi
                    </button>
                  </div>
                )}
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl font-semibold
                           bg-red-600 text-white hover:bg-red-700 transition"
              >
                Keluar
              </button>
            </>
          )}

          {/* MOBILE MENU ICON */}
          <i
            className="ri-menu-3-line text-3xl lg:hidden cursor-pointer"
            onClick={toggleMenu}
          ></i>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden absolute right-4 mt-2 w-44 bg-[#c6a84d]
        rounded-xl shadow-lg text-white font-semibold transition-all duration-300
        overflow-hidden ${open ? "max-h-72 py-3" : "max-h-0 py-0"}`}
      >
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="block py-2 px-4 hover:bg-white/30 rounded transition"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* AUTH MOBILE */}
          {/* {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block py-2 px-4 hover:bg-white/30 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 px-4 hover:bg-white/30 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left w-full py-2 px-4 hover:bg-red-500 rounded"
            >
              Logout
            </button>
          )} */}
        </ul>
      </div>
      {/* Modal edit password */}
      {changePasswordOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setChangePasswordOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-[380px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h2>
            <div className="space-y-3">
              <input
                type="password"
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                placeholder="Kata sandi saat ini"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
              />

              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                placeholder="Kata sandi baru"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
              />

              <input
                type="password"
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                placeholder="Konfirmasi kata sandi baru"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
              />

              <button
                onClick={handleChangePassword}
                className="w-full bg-[#c6a84d] text-white py-2 rounded-lg
                     hover:bg-[#b1913e] transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT PROFILE */}
      {editProfileOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setEditProfileOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-[380px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setEditProfileOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profil</h2>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
                placeholder="Nama"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
                placeholder="Email"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
                placeholder="Alamat"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a84d]"
                placeholder="Telepon"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-[#c6a84d] text-white py-2 rounded-lg
                     hover:bg-[#b1913e] transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
