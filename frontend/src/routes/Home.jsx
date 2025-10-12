import { useRef } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { SpecialityMenu } from '../components/SpecialityMenu'
import { Header } from '../components/Header'

export const Home = () => {


  return (
      <div>
        <Header/>
        <SpecialityMenu/>
      </div>

  )
}
