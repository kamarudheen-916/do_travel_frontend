
const initialState  ={
    token :localStorage.getItem('token') || null
}


export const  authReducer  =(state:any=initialState,action:any)=>{    
    switch (action.type){
        case 'login_successful':
            return {
                ...state,
                token:action.payload
            }
        case 'logout':
            return {
                ...state,
                token:null
            }
            case 'updateToken':
                return {
                    ...state,
                    token:action.payload
                }
            default :
            return state
    }
    
}


export const reRender =(state :any={reRender : false},action:any)=>{
    state.reRender = action
    return state
}