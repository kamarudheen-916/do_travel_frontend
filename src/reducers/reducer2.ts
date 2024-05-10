import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notificationCount:0
}



const notificationSlice = createSlice({
    name:'notificationCount',
    initialState:initialState,
    reducers:{
        checkCount(state,action:any){
            const count = action.payload
            state.notificationCount = count
        }
    }
})

export const {checkCount} = notificationSlice.actions
export default notificationSlice.reducer