import { createContext, useState, useEffect } from 'react';
import { doctorsData } from '../assets/frontend_assets/assets';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(doctorsData);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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

  const login = (authToken, userData = null) => {

        // - Call API to authenticate user
        // - Handle success/error

    setToken(authToken);
    localStorage.setItem('token', authToken);

    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const fetchUserProfile = async () => {
    if (!token) return;

    //TODO: Call backend API to fetch user profile using the token
  };

  useEffect(() => {
    if (token && !user) {
      fetchUserProfile();
    }
  }, [token]);

  const value = {
    doctors,
    bookAppointment,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    fetchUserProfile
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};