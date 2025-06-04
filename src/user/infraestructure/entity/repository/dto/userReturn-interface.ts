export interface ReturnDtoUser { 
    idUser:string
    username:string
    email:  string
    fullName: string
    bio?:string 
    profilePictureUrl: string | undefined
    isPrivate: boolean
}