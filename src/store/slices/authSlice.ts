import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const ACCESS_KEY = 's-access'
const USERNAME_KEY = 's-login'
const EXPIRE_KEY = 's-expire'

interface AuthState {
    accessToken: string,
    login: string,
    isAuth: boolean
}

function getInitialState(): AuthState {
    const expireIn = localStorage.getItem(EXPIRE_KEY) ?? null

    if (expireIn && new Date() > new Date(expireIn)) {
        return {
            accessToken: '',
            login: '',
            isAuth: false
        }
    }

    return {
        accessToken: localStorage.getItem(ACCESS_KEY) ?? '',
        login: localStorage.getItem(USERNAME_KEY) ?? '',
        isAuth: Boolean(localStorage.getItem(ACCESS_KEY))
    }
}

// const initialState: AuthState = {
//     accessToken: localStorage.getItem(ACCESS_KEY) ?? '',
//     login: localStorage.getItem(USERNAME_KEY) ?? '',
//     isAuth: Boolean(localStorage.getItem(ACCESS_KEY))
// }

const initialState: AuthState = getInitialState()

interface AuthPayload {
    login: string,
    accessToken: string
} 


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       login(state, action: PayloadAction<AuthPayload>) {
        state.login = action.payload.login
        state.accessToken = action.payload.accessToken
        state.isAuth = Boolean(action.payload.accessToken)

        const tokenExpire = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

        localStorage.setItem(ACCESS_KEY, action.payload.accessToken)
        localStorage.setItem(USERNAME_KEY, action.payload.login)
        localStorage.setItem(EXPIRE_KEY, tokenExpire.toString())
       },
       logout(state) {
        state.accessToken = ''
        state.login = ''
        state.isAuth = false

        localStorage.removeItem(ACCESS_KEY)
        localStorage.removeItem(USERNAME_KEY)
        localStorage.removeItem(EXPIRE_KEY)
       }
    }
})

    export const { login, logout } = authSlice.actions
    // export const selectAllFilms = (state) => state.films;

    export default authSlice.reducer