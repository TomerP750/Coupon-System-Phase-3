import {Coupon} from "../Models/Coupon";
import {configureStore, createSlice} from "@reduxjs/toolkit";


interface CustomerState {
    coupons: Coupon[]
}

const init:Coupon[] = []

const customerSlice = createSlice({
    name:"customers",
    initialState: {
        coupons: init
    },
    reducers: {

    }
})

export const {} = customerSlice.actions;
export const customerStore = configureStore({
    reducer: customerSlice.reducer
})