import { useState } from 'react';
import { AddDoctorModal } from './AddDoctorModal';

export const DoctorsContent = ({ doctors, onDeleteDoctor, onDoctorAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (doctor) => {
    if (!confirm(`Are you sure you want to permanently delete ${doctor.name}?`)) {
      return;
    }
    onDeleteDoctor(doctor._id);
  };

  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage doctors</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Doctor
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className='border-2 border-primary rounded-lg overflow-hidden hover:translate-y-[-10px] transition-all duration-500 group relative hover:bg-primary'
            >
              <button
                onClick={() => handleDelete(doctor)}
                className='absolute top-3 right-3 z-10 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all shadow-xl border-2 border-white'
                aria-label="Delete doctor"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className='h-72 w-full bg-gray-50 overflow-hidden relative'>
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className='w-full h-full object-cover object-top'
                />
              </div>

              <div className='p-4 relative group-hover:bg-primary transition-colors duration-300'>

                <h3 className='text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>{doctor.name}</h3>
                <p className='text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300'>{doctor.specialization}</p>
              </div>
            </div>
          ))}
        </div>
          </div>

      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDoctorAdded={onDoctorAdded}
      />
    </>
  )};