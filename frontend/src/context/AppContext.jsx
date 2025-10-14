import React, { createContext } from 'react';
import { doctorsData } from '../assets/frontend_assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const value = {
    doctors: doctorsData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};