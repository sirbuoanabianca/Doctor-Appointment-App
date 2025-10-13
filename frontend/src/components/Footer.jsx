import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'



export const Footer = () => {
  return (
    <div className='bg-gray-50 mt-20 '>
        <div className='max-w-7xl mx-auto px-4 sm:px-8 py-16'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
                <div className='space-y-6'>
                    <div className='flex items-center gap-3'>
                        <img src={assets.logo} className='w-16' alt='logo' />
                        <h1 className='text-2xl font-bold text-primary'>NovaCare</h1>
                    </div>
                    <p className='text-gray-600 leading-relaxed'>Your health is our priority.</p>
                </div>

                <div>
                    <h3 className='font-bold text-gray-800 text-lg mb-5 uppercase tracking-wide'>Company</h3>
                    <ul className='space-y-3'>
                        <Link to='/' className='text-gray-600 hover:text-primary cursor-pointer transition-colors block'>Home</Link>
                        <Link to='/about' className='text-gray-600 hover:text-primary cursor-pointer transition-colors block'>About us</Link>
                        <Link to='/contact' className='text-gray-600 hover:text-primary cursor-pointer transition-colors block'>Contact</Link>
                        <Link to='/privacy' className='text-gray-600 hover:text-primary cursor-pointer transition-colors block'>Privacy Policy</Link>
                    </ul>
                </div>

                <div>
                    <h3 className='font-bold text-gray-800 text-lg mb-5 uppercase tracking-wide'>Get in Touch</h3>
                    <ul className='space-y-4'>
                        <li className='text-gray-600 flex items-start gap-3'>
                              <MdEmail className='text-primary text-xl' />
                            <span>contact@clujNovaCare.ro</span>
                        </li>
                        <li className='text-gray-600 flex items-start gap-3'>
                            <MdLocationOn className='text-primary text-xl' />
                            <span>Mihai Veliciu 39, Cluj-Napoca</span>
                        </li>
                        <li className='text-gray-600 flex items-start gap-3'>
                            <MdPhone className='text-primary text-xl' />
                            <span>0771 547 133</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='border-t border-gray-300 pt-8'>
                <p className='text-center text-gray-500 text-sm'>© 2025 NovaCare Clinic - All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}
