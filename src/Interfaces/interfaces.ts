export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isBlocked:boolean,
    gender:string;
    DOB:string;
    Country:string;
    State:string;
    MobileNumber:string;
    City:string;
    favoritePlace:string[] ;
    Profile: string; 
    IsVerified:boolean
    OTP:string;
    
}

export interface PropertyFormData {
   
    PropertyName: string;
    email: string;
    password: string;
    isBlocked:boolean;
    startedDate:string;
    Address:string;
    TypeOfStay:string[];
    Speciality:string[];
    MobileNumber:string;
    license: string; 
    PropertyProfile: string; 
    IsVerified:boolean;
    OTP:string
  
}

export interface LoginFormData {
    email :string;
    password:string;
}
export interface forgetFormData {
    email:string;
    password:string;
    confirmPassword:string;
}
export interface authReducerAction {
    type:any,
    payload:any
}

export interface SetErrorLabelValue {
    name:string,
    message : string,
}


export interface comments {
    comment:string,
    id:string,
    commet_likes:number
}
export interface userPost {
    _id: string;
    userId: string;
    post: string;
    description: string;
    comments: comments[]; 
    date: string;
    like:number
  
  }