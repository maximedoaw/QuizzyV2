import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthStore from "@/zustand/AuthStore"


import React from 'react'
import Login from "./AuthModalContent/Login"
import SignUp from "./AuthModalContent/SignUp"
import ResetPassword from "./AuthModalContent/ResetPassword"

type AuthModalProps = {}

const AuthModal : React.FC<AuthModalProps> = () => {
 const { view } = AuthStore()
 return (
    <>
    
     {view === 'Login' && <Login />}
     {view === 'SignUp' && <SignUp />}
     {view === 'ResetPassWord' && <ResetPassword />}
     
    </>
  )

}

export default AuthModal
