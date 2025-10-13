import { useRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { SpecialityMenu } from '../components/SpecialityMenu'
import { Header } from '../components/Header'
import { HomeDoctors } from '../components/HomeDoctors'

export const Home = () => {


  return (
      <div className='max-w-7xl mx-auto px-4 sm:px-8'>
        <Header/>
        <SpecialityMenu/>
        <HomeDoctors/>
      </div>

  )
}
