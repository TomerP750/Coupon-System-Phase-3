// watch from 13:30 last lecture

import {ClientType} from "../../Services/ClientType";
import {jwtDecode} from "jwt-decode";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    user: JWTUser | null
}

export interface JWTUser {
    id:number
    name: string
    email:string
    clientType: ClientType
}


const initState = {
    // email: localStorage.my_token ? jwtDecode<JWTUser>(localStorage.my_token).email : "",
    // clientType: localStorage.my_token ? jwtDecode<JWTUser>(localStorage.my_token).clientType : ClientType.CUSTOMER,
    // token: ""
    user: localStorage.my_token ? jwtDecode<JWTUser>(localStorage.my_token) : null
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<string>) => {
            const decodedToken: JWTUser = jwtDecode<JWTUser>(localStorage.my_token);
            state.user = decodedToken;
        },
        logout: (state: AuthState) => {
            state.user = null;
            localStorage.removeItem("my_token");
        }
    }
})

export const {login, logout} = authSlice.actions;
export const authStore = configureStore({
    reducer: authSlice.reducer
})

