import { create } from 'zustand'

interface IAuthStore  { 
    open: boolean, 
    view : 'Login' | 'SignUp' | 'ResetPassWord',
    isOpen: () => void,
    changeView : (view : 'Login' | 'SignUp' | 'ResetPassWord') => void
}

const AuthStore = create<IAuthStore>((set) => ({
  open: false,
  view: 'Login',
  isOpen: () => set((state) => ({ open: !state.open })),
  changeView : (view : 'Login' | 'SignUp' | 'ResetPassWord') => set((state) => ({ view }))
}))

export default AuthStore