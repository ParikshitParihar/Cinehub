import React, { useEffect, useState } from "react";
import logo1 from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { useAuth } from "../userAuth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../userAuth/firebaseConfig";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace || "");
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth(); 

  useEffect(() => {
    if (searchInput) navigate(`/search?q=${searchInput}`);
  }, [searchInput, navigate]);

  const handleSearch = (e) => e.preventDefault();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate("/auth"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-black/75 z-40">
      <div className="container mx-auto px-11 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo1} alt="logo" width={120} />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav) => (
            <div key={nav.label}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-500 text-black font-semibold"
                      : "text-gray-300"
                  } hover:bg-yellow-400 hover:text-black`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          {/* Desktop Search */}
          <form
            className="items-center gap-2 hidden lg:flex"
            onSubmit={handleSearch}
          >
            {showDesktopSearch && (
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent px-4 py-1 outline-1 rounded-2xl text-white border border-gray-500"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                autoFocus
              />
            )}
            <button
              type="button"
              className="text-2xl text-white"
              onClick={() => setShowDesktopSearch(!showDesktopSearch)}
            >
              <IoSearchOutline className="cursor-pointer" />
            </button>
          </form>

          {/* Mobile Search */}
          <form
            className="flex items-center gap-2 lg:hidden"
            onSubmit={handleSearch}
          >
            {showMobileSearch && (
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent px-4 py-1 outline-1 rounded-2xl text-white border border-gray-500"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                autoFocus
              />
            )}
            <button
              type="button"
              className="text-2xl text-white"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <IoSearchOutline className="cursor-pointer" />
            </button>
          </form>

          {/* ✅ User Dropdown */}
          <div className="relative">
            {user ? (
              <>
                {/* First letter circle */}
                <div
                  className="w-9 h-9 flex items-center justify-center bg-yellow-500 text-black font-bold text-lg rounded-full cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg p-3 w-44 z-50">
                    <p className="text-sm text-gray-300 mb-2 truncate">
                      {user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-400 hover:text-red-500 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div
                className="w-9 h-9 rounded-full overflow-hidden cursor-pointer active:scale-90 transition-transform"
                onClick={() => navigate("/auth")} // ✅ open login page
              >
                <img
                  src={userIcon}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

