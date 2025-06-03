
export interface IUser {
    idUser: string
    username: string
    email: string
    password: string
    fullName?: string
    bio?: string
    profilePictureUrl?: string
    isPrivate?: boolean
    createdAt?: Date
    updatedAt?: Date
}