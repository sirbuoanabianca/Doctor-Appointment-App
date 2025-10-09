import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Doctors from './routes/Doctors'
import Login from './routes/Login'
import About from './routes/About'
import Contact from './routes/Contact'
import UserProfile from './routes/UserProfile'
import UserAppointments from './routes/UserAppointments'
import Appointment from './routes/Appointment'

export const App = () => {
  return (
    <div className='mx-4 sm:mx - [10%]'>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/user-appointments' element={<UserAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/' element={<Home />} />



        
      </Routes>
    </div>
  )
}

export default App