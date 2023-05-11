import axios from "../../axios/axios";
import {login} from "../slices/authSlice";
import { AppDispatch } from "../store";


interface AuthResponse {
    accessToken: string,
    expire: string
}

interface AuthData {
    login: string,
    password: string
}

export const loginAction = (data: AuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<AuthResponse>('api/v1/account/login', data)
            dispatch(login({
                login: data.login,
                accessToken: response.data.accessToken
            }))
        } catch (e) {
            console.log('Error login', e)
        }
    }
}