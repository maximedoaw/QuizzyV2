import React from 'react'
import { Button } from "@/components/ui/button"
import ThemeButton from './ThemeButton'
import { Input } from "@/components/ui/input"
import AuthModal from '../AuthModal/AuthModal'

type NavBarProps = {}

const NavBar : React.FC<NavBarProps> = () => {
  return (
    <div className='border flex p-5 justify-between items-center'>
      <Input type="text" placeholder="Search quizz" className='mr-3 max-w-[1030px]
      focus:outline-blue-400'/>
      <div className='space-x-3 flex'>
        <Button className='bg-blue-500 hover:bg-blue-400'>Login</Button>
        <Button className='bg-blue-500 hover:bg-blue-400'>SignUp</Button>
        <ThemeButton/>
      </div>
      <AuthModal />
    </div>
  )
}

export default NavBar
