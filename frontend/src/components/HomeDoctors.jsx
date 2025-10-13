import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets,doctorsData } from '../assets/frontend_assets/assets'


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

      <div className='flex justify-center mt-10 mb-20'>
        <Link
          to='/doctors'
          className='bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300'
        >
          More doctors
        </Link>
      </div>


<h2 className='text-3xl font-bold text-center mt-20 mb-12'>Why choose NovaCare?</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
        <div className='border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <h3 className='text-xl font-semibold text-gray-800'>Correct diagnostic</h3>
            <img src={assets.magnifyingIcon} alt='magnifying glass' className='w-8 h-8' />
          </div>
          <p className='text-gray-600'>Correct diagnosis is the foundation of quality medical care. Our team aims to accurately identify conditions, offering personalized treatments to ensure the desired results.</p>
        </div>

        <div className='border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <h3 className='text-xl font-semibold text-gray-800'>Empathy</h3>
            <img src={assets.empathyIcon} alt='empathy' className='w-8 h-8' />
          </div>
          <p className='text-gray-600'>We treat every patient with compassion, understanding, and respect for their individual needs.</p>
        </div>

        <div className='border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <h3 className='text-xl font-semibold text-gray-800'>Personalized solutions</h3>
            <img src={assets.solutionIcon} alt='solutions' className='w-8 h-8' />
          </div>
          <p className='text-gray-600'>Every treatment plan is tailored to your specific health needs and lifestyle preferences.</p>
        </div>
      </div>
    </div>

    
  )
}
