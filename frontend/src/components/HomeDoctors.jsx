import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doctorsData } from '../assets/frontend_assets/assets'


export const HomeDoctors = () => {
  const topDoctors = [...doctorsData]
    .sort((a, b) => parseInt(b.experience) - parseInt(a.experience))
    .slice(0, 6);

    const navigate = useNavigate()

  return (
    <div className='py-20'>
      <h2 className='text-3xl font-bold text-center mb-12'>NovaCare medical team from Cluj-Napoca</h2>
      <h1 className='text-xl text-center mb-12'>Meet our most experienced doctors</h1>


      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {topDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className='border-2 border-primary rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
          >
            <div className='h-72 w-full bg-blue-50 overflow-hidden'>
              <img
                src={doctor.image}
                alt={doctor.name}
                className='w-full h-full object-cover object-top'
              />
            </div>
            <div className='p-4 relative'>
              <div className='absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full'>
                {doctor.experience}
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>{doctor.name}</h3>
              <p className='text-sm text-gray-600'>{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-10'>
        <Link
          to='/doctors'
          className='bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300'
        >
          More doctors
        </Link>
      </div>
    </div>
  )
}
