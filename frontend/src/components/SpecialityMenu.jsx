import React from 'react'
import { specialityData } from '../assets/frontend_assets/assets'

export const SpecialityMenu = () => {
  return (
    <div id="specialityRef" className='max-w-7xl mx-auto px-4 py-20'>
      <h2 className='text-3xl font-bold text-center mb-8'>Our services</h2>
      <div className='flex justify-center items-center gap-20'>
        {specialityData.map((item, index) => (
          <div key={index} className='flex flex-col items-center gap-2'>
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
