import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    adminToken : Cookies.get('adminToken')||null
}

const adminSlice = createSlice({
    name:'adminLogin',
    initialState:initialState,
    reducers:{
        adminLogin(state,action:any){
            // console.log(state.adminToken,"redux.........");
            
            state.adminToken = action.payload
            console.log(state.adminToken,"redux.........");

        },
        adminLogOut(state){
            console.log(state.adminToken,"redux.........");

            state.adminToken = null
        }
    }
})

export const selectToken = (state:any)=>state.adminAuth.adminToken

export const {adminLogin,adminLogOut} = adminSlice.actions
export default adminSlice.reducer