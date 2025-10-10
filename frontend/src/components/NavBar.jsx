import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    return (
        <div className='flex items-center justify-between py-4 border-b border-gray-200'>
            <img src={assets.logo} className='w-32' alt='logo' />
            <ul className='flex items-center gap-8 font-medium text-gray-700'>
                <NavLink to='/'>
                    <li className='hover:text-primary cursor-pointer'>Home</li>
                </NavLink>
                <NavLink to='/about'>
                    <li className='hover:text-primary cursor-pointer'>About</li>
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='hover:text-primary cursor-pointer'>Doctors</li>
                </NavLink>
                <NavLink to='/contact'>
                    <li className='hover:text-primary cursor-pointer'>Contact</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                <NavLink to='/login'>
                    <button className='px-6 py-2 text-gray-700 hover:text-primary'>Login</button>
                </NavLink>
                <button className='px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90'>Create account</button>
            </div>
        </div>
    )
}

