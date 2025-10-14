import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { specialityData } from '../assets/frontend_assets/assets'

export const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  useEffect(() => {
    if (speciality) {
      setFilteredDocs(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilteredDocs(doctors);
    }
  }, [doctors, speciality]);

  const handleSpecialityClick = (specialityName) => {
    if (specialityName === null || speciality === specialityName) {
      navigate('/doctors');
    } else {
      navigate(`/doctors/${specialityName}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">
        Our doctors
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <div className="space-y-2">

            {specialityData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSpecialityClick(item.speciality)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-500 hover:shadow-md ${speciality === item.speciality
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white border-gray-300 hover:border-primary'
                  }`}
              >
                <p className="text-sm font-semibold">{item.speciality}</p>
                {speciality === item.speciality}
              </div>
            ))}
          </div>
        </div>



        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {filteredDocs.map((doctor) => (
            <div
              key={doctor._id}
              className='border-2 border-primary rounded-lg overflow-hidden hover:translate-y-[-10px] transition-all duration-500 group relative hover:bg-primary'
            >
              <div className='h-72 w-full bg-gray-50 overflow-hidden relative'>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className='w-full h-full object-cover object-top'
                />

                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40'>
                  <Link
                    to={`/appointment/${doctor._id}`}
                    className='bg-white text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl'
                  >
                    Book appointment
                  </Link>
                </div>
              </div>

              <div className='p-4 relative group-hover:bg-primary transition-colors duration-300'>
                <div className='absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300'>
                  {doctor.experience}
                </div>
                <h3 className='text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>{doctor.name}</h3>
                <p className='text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300'>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>





      </div>
    </div>
  )
}