import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setOpen(!open);

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

  return (
    <nav
      className={`fixed w-full z-20 transition-all ${
        scrolled
          ? "py-4 shadow bg-white/40 backdrop-blur-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-10 flex items-center">

        {/* LOGO — SELALU DI KIRI */}
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="h-10" />
          <h1 className="text-xl lg:text-2xl font-bold">Azmya Fashion</h1>
        </div>

        {/* MENU TENGAH */}
        <ul className="hidden lg:flex gap-10 font-semibold absolute left-1/2 -translate-x-1/2">
          <li><Link to="/" className="hover:text-[#c6a84d] hover:underline">Home</Link></li>
          <li><Link to="/" className="hover:text-[#c6a84d] hover:underline">Pre-Order</Link></li>
          <li><Link to="/" className="hover:text-[#c6a84d] hover:underline">Products</Link></li>
          <li><Link to="/" className="hover:text-[#c6a84d] hover:underline">Contact</Link></li>
        </ul>

        {/* KANAN — BUTTON + HAMBURGER */}
        <div className="ml-auto flex items-center gap-3">
          {/* PROFILE */}
          <div
            className="hidden sm:block bg-[#c6a84d] px-5 py-2 text-white font-bold rounded-full transition mr-4"
          >
            Leo
          </div>

          {/* HAMBURGER */}
          <i
            className="ri-menu-3-line text-3xl lg:hidden cursor-pointer"
            onClick={toggleMenu}
          ></i>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden absolute right-4 mt-2 w-40 bg-[#c6a84d]
        rounded-lg shadow-lg text-white font-semibold transition-all duration-300 
        overflow-hidden ${open ? "max-h-64 py-3" : "max-h-0 py-0"}`}
      >
        <ul className="flex flex-col gap-1">
          {["Home", "Pre-Order", "Products", "Contact"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block w-full py-2 px-3 rounded hover:bg-white/30 transition-all"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
