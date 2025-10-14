import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { Doctors } from './routes/Doctors'
import { Login } from './routes/Login'
import { About } from './routes/About'
import { Contact } from './routes/Contact'
import { UserProfile } from './routes/UserProfile'
import { UserAppointments } from './routes/UserAppointments'
import { Appointment } from './routes/Appointment'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { AppContextProvider } from './context/AppContext'

export const App = () => {
  return (
    <AppContextProvider>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/user-appointments' element={<UserAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  )
}

export default App