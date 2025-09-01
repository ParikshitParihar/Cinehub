import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/navigation';




const Header = () => {

    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
    const [searchInput, setSearchInput] = useState(removeSpace);
    const [showDesktopSearch, setShowDesktopSearch] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();


    // console.log("remove space",removeSpace);

    console.log("location",);

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput])

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form reload
    };


    return (
        <header className='fixed top-0 w-full h-16 bg-black z-40' style={{ opacity: 0.75 }}>
            <div className='container mx-auto px-11 flex items-center h-full'>
                <Link to={"/"}>
                    <img src={logo} alt="logo" width={120} />
                </Link>

                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {
                        navigation.map((nav, index) => {
                            return (
                                <div key={nav.label}>
                                    <NavLink
                                        to={nav.href}
                                        className={({ isActive }) =>
                                            `px-3 py-1 rounded-md transition-all duration-200 ${isActive ? "bg-yellow-500 text-black font-semibold" : "text-gray-300"} hover:bg-yellow-400 hover:text-black`
                                        }
                                    >
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className='ml-auto flex items-center gap-5'>
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


                    {/* ṣearch icon inside placeholder */}
                    {/* <form className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="bg-transparent pl-4 pr-10 py-1 border border-gray-400 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 w-64"
                        />
                        <IoSearchOutline className="absolute right-3 text-gray-400 text-xl pointer-events-none" />
                    </form> */}


                    <div className='w-9 h-9 rounded-full overflow-hidden cursor-pointer active:scale-60 transition-all'>
                        <img src={userIcon} alt="user" width="w-full h-full" />
                    </div>
                </div>


            </div>
        </header>
    )
}

export default Header