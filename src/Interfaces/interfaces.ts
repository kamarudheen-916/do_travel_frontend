export interface UserFormData {
    _id?:string;
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
    _id?:string;
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
    comments:string,
}
export interface userPost {
    _id?: string;
    userId: string;
    isProperty:boolean,
    post: string;
    description: string;
    comments: comments[]; 
    date: string;
    like:[string]
    ratings?:[ratingData]
    PostProfile:string,
    PostName:string,
  }
export interface Room{
    _id?:string,
    propertyId:string;
    roomName:string,
    typeOfRoom:string,
    ratings?:[ratingData],
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

export interface bookingData {
    _id?:string
    roomId:string
    roomName:string
    roomType:string
    images:string[]
    propertyName:string
    propertyProfile:string
    propertyId:string
    bookingUserId:string
    First_Name:string
    Second_Name:string
    Email:string
    Nationality:string
    Mobile:number
    numberOfAdults:number
    numberOfChilden:number
    isCancellationfree:boolean
    isBeforePayment:boolean
    totalPrice:number
    numberDays:number
    food:string[]
    facilities:string[]
    checkInDate:string
    checkOutDate:string
    numberOfRoom:number
    paymentIsOnline:boolean
    bookingStatus:string
    location:string
    createdAt?:Date
}

export interface adminFormData {
    adminName:'',
    password:'',
}

export interface PostReport{
    _id?:string
    postId:string
    reporterId:string
    reason:string
    reportDate:Date
    status:string
    reporterName:string
    reporterType:string

}