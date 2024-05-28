import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    messageCount : 0
}

const messageCountSlice = createSlice({
    name:'messageCount',
    initialState:initialState,
    reducers:{
        setMessageCount(state,action:any){
            state.messageCount= action.payload
        }
    }
})

export const messgCount = (state:any) => state.messageReducer.messageCount
export const {setMessageCount} =  messageCountSlice.actions
export default messageCountSlice.reducer