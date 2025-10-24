import { assets } from '../assets/frontend_assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'


export const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const { token, logout } = useContext(AppContext)
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()  

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between py-1 mb-5 border-b border-gray-300'>
            <NavLink to='/' className='flex items-center gap-3'>
                <img src={assets.logo} className='w-30 cursor-pointer transition-transform hover:scale-105' alt='logo' />
                <h1 className='text-2xl font-bold text-primary'>NovaCare</h1>
            </NavLink>
            <ul className='hidden md:flex items-center gap-10 font-medium text-gray-600 text-sm'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : ''}>
                    <li className='py-1 cursor-pointer hover:text-primary transition-colors'>HOME</li>
                </NavLink>
                <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : ''}>
                    <li className='py-1 cursor-pointer hover:text-primary transition-colors'>DOCTORS</li>
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : ''}>
                    <li className='py-1 cursor-pointer hover:text-primary transition-colors'>ABOUT</li>
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : ''}>
                    <li className='py-1 cursor-pointer hover:text-primary transition-colors'>CONTACT</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token ?
                        <div className='flex items-center gap-2 relative'>
                            <img
                                src={assets.userProfile}
                                className='w-10 rounded-full cursor-pointer border-1 border-primary'
                                alt='user profile'
                            />
                            <p className='text-gray-600'>{user?.name}</p>
                            <img
                                src={assets.dropdownIcon}
                                className='w-2.5 cursor-pointer'
                                alt='dropdown'
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-20'>
                                    <p
                                        className='py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-primary rounded cursor-pointer transition-colors'
                                        onClick={() => {
                                            navigate('/user-profile')
                                            setShowDropdown(false)
                                        }}
                                    >
                                        My profile
                                    </p>
                                    <p
                                        className='py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-primary rounded cursor-pointer transition-colors'
                                        onClick={() => {
                                            navigate('/user-appointments')
                                            setShowDropdown(false)
                                        }}
                                    >
                                        My appointments
                                    </p>
                                    <p
                                        className='py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-primary rounded cursor-pointer transition-colors'
                                        onClick={() => {
                                            logout() 
                                            setShowDropdown(false)
                                            navigate('/login')
                                        }}
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}
                        </div>
                        :

                        location.pathname === '/create-account' ? (
                            <NavLink to='/login'>
                                <button className='bg-primary text-white px-8 py-3 rounded-full font-light hover:bg-primary/90 transition-all shadow-md hover:shadow-lg'>Login</button>
                            </NavLink>
                        ) : (
                            <NavLink to='/create-account'>
                                <button className='bg-primary text-white px-8 py-3 rounded-full font-light hover:bg-primary/90 transition-all shadow-md hover:shadow-lg'>Create account</button>
                            </NavLink>
                        )
                }
            </div>
        </div>
    )
}

