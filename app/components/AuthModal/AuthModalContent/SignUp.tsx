import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { FaSpinner } from "react-icons/fa";
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
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERRORS } from '@/firebase/error';
const SignUp = () => {

  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('')
  const { open , isOpen, changeView } = AuthStore()
  const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);

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
    try {


      if (input.password !== input.confirmPassword) {
        setError('Passwords do not match')
        
         if(input.password.length < 8) { 
          setError('Password must be at least 8 characters')
         }

        return
      }

      await createUserWithEmailAndPassword(input.email, input.password)
      setError('')

    } catch (error : any) {

      console.log("An error was happened", error.message);
      
    }

  }

  return (
    <Dialog  open={open} onOpenChange={isOpen}>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign Up</DialogTitle>
        </DialogHeader>
        <OAuthButton />
        <div className="flex flex-col items-center space-x-2 space-y-2">
          <div className="grid flex-1 gap-2">
            <p className='text-red-500 text-sm font-bold text-center'>{FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] || error}</p>
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
              placeholder="password"
              className='w-[300px]'
              name='password'
              value={input.password}
              onChange={onInputChange}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              confirm Password
            </Label>
            <Input
              type='password'
              placeholder="Confirm password"
              className='w-[300px]'
              name='confirmPassword'
              value={input.confirmPassword}
              onChange={onInputChange}
            />
          </div>

          <Button type="submit" size="sm" className="px-3 bg-blue-500 w-[300px] "
          onClick={onSubmit}
          disabled={loading}
          >
              {loading ? (
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
          </Button>
          <p className='text-sm text-gray-500 hover:underline cursor-pointer'
          onClick={() => changeView('Login')}
          >have you already an account?</p>
        </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SignUp
