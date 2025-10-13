import React from 'react'
import { useNavigate } from 'react-router-dom'
import { specialityData } from '../assets/frontend_assets/assets'

export const SpecialityMenu = () => {
  const navigate = useNavigate()

  return (
    <div id="specialityRef" className='py-20'>
      <h2 className='text-3xl font-bold text-center mb-8'>Our services</h2>
      <div className='flex justify-center items-center gap-20'>
        {specialityData.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/doctors/${item.speciality}`)}
            className='flex flex-col items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 gap-2'
          >
            <div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center'>
              <img src={item.image} alt={item.speciality} className='w-16 h-16' />
            </div>
            <p className='text-sm font-medium text-gray-700'>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
