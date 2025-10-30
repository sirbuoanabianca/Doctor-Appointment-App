import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

export const AppContext = createContext();

const API_URL = import.meta.env.SERVER_API_URL || 'http://localhost:5000';

export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [specializations, setSpecializations] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctor`);
      if (response.data.success) {
        console.log('Fetched doctors:', response.data.doctors);
        const doctorsWithImageProfile = response.data.doctors.map(doctor => ({
          ...doctor,
          profileImage: `${API_URL}${doctor.profileImage}`,
        }));
        setDoctors(doctorsWithImageProfile);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctor/specializations`);
      if (response.data.success) {
        setSpecializations(response.data.specializations);
      }
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

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

  const login = async (authToken, userData = null) => {

    setToken(authToken);
    localStorage.setItem('token', authToken);

    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }

    fetchDoctors();

  };

  const register = async (authToken, userData = null) => {
    setToken(authToken);
    localStorage.setItem('token', authToken);

    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }

    fetchDoctors();
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const fetchUserProfile = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetchUserProfile();
    }
  }, [token]);

  const value = {
    API_URL,
    doctors,
    specializations,
    bookAppointment,
    token,
    setToken,
    user,
    setUser,
    login,
    register,
    logout,
    fetchUserProfile
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};