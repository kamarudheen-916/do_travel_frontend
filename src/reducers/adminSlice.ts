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
            
            
            state.adminToken = action.payload


        },
        adminLogOut(state){


            state.adminToken = null
        }
    }
})

export const selectToken = (state:any)=>state.adminAuth.adminToken

export const {adminLogin,adminLogOut} = adminSlice.actions
export default adminSlice.reducer