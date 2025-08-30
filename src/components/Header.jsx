import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/navigation';




const Header = () => {

    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(searchInput){
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
                                    <NavLink to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center gap-2'onSubmit={handleSearch}>
                        <input type="text" placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-1 rounded-2xl hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className='text-2xl text-white'><IoSearchOutline /></button>
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