import { createContext, useState } from 'react';
import { doctorsData } from '../assets/frontend_assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(doctorsData);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

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

  const login = (authToken) => {
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    doctors,
    bookAppointment,
    token,
    setToken,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};