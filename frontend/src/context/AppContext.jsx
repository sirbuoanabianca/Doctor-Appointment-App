import { createContext, useState } from 'react';
import { doctorsData } from '../assets/frontend_assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(doctorsData);

  const bookAppointment = (docId, slotDate, slotTime) => {
    setDoctors(prevDoctors => {
      return prevDoctors.map(doctor => {
        if (doctor._id === docId) {
          return {
            ...doctor,
            slots_booked: [...doctor.slots_booked, { date: slotDate, time: slotTime }]
          };
        }
        return doctor;
      });
    });
  };

  const value = {
    doctors,
    bookAppointment
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};