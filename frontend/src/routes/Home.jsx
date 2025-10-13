import { useRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { SpecialityMenu } from '../components/SpecialityMenu'
import { Header } from '../components/Header'
import { HomeDoctors } from '../components/HomeDoctors'

export const Home = () => {
  const specialityRef = useRef(null)

  return (
      <div className='max-w-7xl mx-auto px-4 sm:px-8'>
        <Header specialityRef={specialityRef} />
        <SpecialityMenu specialityRef={specialityRef} />
        <HomeDoctors/>
      </div>

  )
}
