import React, { useEffect, useState } from 'react'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthStore from '@/zustand/AuthStore'
import OAuthButton from './OAuthButton'
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '@/firebase/clientApp'
import { FaSpinner } from 'react-icons/fa'
import { FIREBASE_ERRORS } from '@/firebase/error'
const Login = () => {
  
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const { open , isOpen, changeView } = AuthStore()
  const [signInwithEmailAndPassword, user, loading, userError] = useSignInWithEmailAndPassword(auth);
  

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    event.preventDefault();

    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
      })
    )
    console.log(input);
    
  }
  
  const onSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signInwithEmailAndPassword(input.email, input.password)
  }


  return (
    <Dialog  open={open} onOpenChange={isOpen}>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>
        </DialogHeader>
        <OAuthButton />
        <div className="flex flex-col items-center space-x-2 space-y-2">
          <div className="grid flex-1 gap-2">
            <p className='text-red-500 text-sm font-bold text-center'>{FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</p>

            <Label htmlFor="link" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              className='w-[300px]'
              name='email'
              value={input.email}
              onChange={onInputChange}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Password
            </Label>
            <Input
              type='password'
              placeholder="Password"
              className='w-[300px]'
              name='password'
              value={input.password}
              onChange={onInputChange}
            />


          </div>

          <Button 
            type="submit" 
            size="sm" 
            className="px-3 bg-blue-500 w-[300px]"
            onClick={onSubmit}
            disabled={loading}
          >
              {loading ? (
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
          </Button>
          <div>
            <span className='text-[12px] text-gray-500  hover:underline cursor-pointer'
            onClick={() => changeView('SignUp')}
        
            >Not account?</span>
            <span 
              className='text-[12px] text-gray-500 hover:underline cursor-pointer'
              onClick={() => changeView('ResetPassWord')}
            > forget password</span>
         </div>
        </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Login
