import {Coupon} from "../Models/Coupon";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CouponState {
    coupons: Coupon[];
}
const init:Coupon[] = [];

const couponSlice = createSlice({
    name: "coupons",
    initialState: {
      coupons: init
    },
    reducers: {
        fetchAllCoupons(state:CouponState, action:PayloadAction<Coupon[]>){
            state.coupons = action.payload;
        },
    }
})


export const {fetchAllCoupons} = couponSlice.actions;
export const couponStore = configureStore({
    reducer: couponSlice.reducer
})