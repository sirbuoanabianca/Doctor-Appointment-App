import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const UserAppointments = () => {

  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My appointments</h1>

      <div className="grid gap-6">
        {doctors.map(doctor => (
          <div
            key={doctor._id}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center gap-6"
          >
            {/* Doctor image */}
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor info */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-900">{doctor.name}</h2>
              <p className="text-gray-600 mt-1">{doctor.speciality}</p>
              
            </div>

            {/* Appointment date & time */}
            <div className="bg-primary/10 px-6 py-3 rounded-lg">
              <p className="text-lg font-semibold text-primary">12 decembrie 2025, ora 10:00</p>
            </div>

            <div className="flex gap-4 ml-12">
              <button className="bg-primary text-white font-semibold rounded-lg px-6 py-3">Pay online</button>
              <button className="bg-primary/10 font-semibold text-gray-900 rounded-lg px-6 py-3">Cancel appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

