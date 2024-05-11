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
    commentedId:string,
    commet_likes:number,
    _id?:string,
    commentTime:string
}
export interface ratingData{
    raterId:string,
    rate:number,
    _id?:string,
    ratedDate:Date,
}
export interface userPost {
    _id?: string;
    userId: string;
    isProperty:boolean,
    post: string;
    description: string;
    comments: comments[]; 
    date: string;
    like:number
    ratings?:[ratingData]
    PostProfile:string,
    PostName:string,
  }
export interface Room{
    _id?:string,
    propertyId:string;
    roomName:string,
    typeOfRoom:string,
    rating:number,
    location:string,
    facilities:string[],
    reviews:string[],
    price:number,
    numOfNights:number,
    numOfAdults:number,
    numOfRoomLeft:number;
    freeCancellation:boolean,
    isBeforePayment:boolean,
    images:string[]
}
export interface searchData {
    _id?:string,
    profileId?:string,
    profile:string,
    name:string,
    isFollowed?:boolean
    isProperty?:boolean
}
export interface NotificationData {
    notificationProfile:string ,
    notificationName:string ,
    isProperty:boolean ,
    followingId:string
 }

 export interface FollowReq{
    requesterId:string,
    followerId:string,
    isProperty:boolean
}

export interface followingData  {
    followingID:string,
    follwingDate:Date,
    isAccepted:boolean,
    isProperty:boolean
}
export interface followerData {
    followerID: string;
    follwingDate: Date;
    isAccepted: boolean;
    isProperty:boolean
}

export interface followSchemaInterface {
        userId:string,
        following:[followingData],
        follower:[followerData]
}