
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

