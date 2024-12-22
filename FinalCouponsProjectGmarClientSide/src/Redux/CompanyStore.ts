import {Coupon} from "../Models/Coupon";
import {configureStore, createSlice} from "@reduxjs/toolkit";

interface CompanyState {
    coupons: Coupon[]
}

const init: Coupon[] = [];

const companySlice = createSlice({
    name:"companies",
    initialState: {
        coupons: init
    },
    reducers: {

    }
})

export const {} = companySlice.actions;
export const companyStore = configureStore({
    reducer: companySlice.reducer
})