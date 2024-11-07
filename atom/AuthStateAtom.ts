import { atom } from "recoil"

interface IAuthState {
    open : boolean,
    view : 'Login' | 'SignUp' | 'ResetPassWord'
}

const defaultAuthState : IAuthState = {
    open : false,
    view : 'Login'
}

export const authState = atom<IAuthState>({
    key: "defaulAuthState",
    default: defaultAuthState
})