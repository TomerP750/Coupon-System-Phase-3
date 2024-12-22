import {Company} from "../Models/Company";
import {Customer} from "../Models/Customer";
import {configureStore, createSlice} from "@reduxjs/toolkit";

interface adminState {
    companies: Company[],
    company: Company,
    customers: Customer[],
    customer: Customer
}

const companyInit: Company[] = [];
const customerInit: Customer[] = [];

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        companies: companyInit,
        customers: customerInit
    },
    reducers: {

    }
})

export const {} = adminSlice.actions;
export const adminStore = configureStore({
    reducer: adminSlice.reducer
})