import React from 'react'
import { mobilenav } from '../contants/navigation'
import { NavLink } from 'react-router-dom'

const MobileNav = () => {
    return (
        // <section className="lg:hidden h-14 bg-neutral-600 fixed bottom-0 w-full"style={{ opacity: 0.4 }}>
        <section className="lg:hidden h-14 fixed bottom-0 w-full bg-neutral-600/40">
            <div className='flex items-center justify-between h-full text-neutral-400'>
                {
                    mobilenav.map((nav, index) => {
                        return (
                            <NavLink 
                            to={nav.href}
                            key={nav.label+"mobilenav"}
                            className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
                            >
                                <div className='text-2xl'>
                                    {nav.icon}
                                </div>
                                <p className='text-sm'>
                                    {nav.label}
                                </p>
                            </NavLink>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default MobileNav