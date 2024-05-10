
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


export const reRender = (state: any = { reRender: false }, action: any) => {
    return {
        ...state,
        reRender: action
    };
};


export const darkTheme = (state :any ={isDarkTheme:false},action:any)=>{
  
    
  switch(action.type){
    case 'darkMode':
        return {
            ...state,
            isDarkTheme:true
        }
    case 'normalMode':
        return {
            ...state,
            isDarkTheme:false
        }
    default:return state
  }
}

export const notificationCountReducer = (state:any={notificationCount:0},action:any)=>{
    return {
        ...state,
        notificationCount:action
    }
}