import React, { useRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'

export const Header = () => {
    const specialityRef = useRef(null)

    const handleBookAppointment = () => {
    specialityRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
     <div className='max-w-7xl mx-auto px-4 flex items-center gap-8 bg-primary rounded-lg'>
    
            <div className='text-white'>
              <h1 className='text-4xl font-bold py-8'>NovaCare Medical Clinic</h1>
              <p>NovaCare Medical Clinic is a modern medical center, located in the center of Cluj-Napoca. Our clinic offers a wide range of high-quality medical services to our patients. For appointments, please click on the button below:</p>
              <button onClick={handleBookAppointment} className='bg-white text-gray-600 cursor-pointer transition-transform hover:scale-105 px-6 py-3 rounded-full flex items-center gap-2 mt-4'>
                <img src={assets.clockIcon} alt='clock icon' className='w-5 h-5' />
                Book an appointment
              </button>
            </div>
    
            <div className='-mr-4'>
              <img src={assets.doctorsGroup} alt='doctors group' />
            </div>
    
          </div>
  )
}
