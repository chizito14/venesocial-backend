import { IPost } from "src/post/application/post.interface.ts"

export interface IUser {
    idUser: string
    username: string
    email: string
    password: string
    fullName?: string
    bio?: string
    profilePictureUrl?: string

    posts?: IPost[]    
    followers?: IUser []
    following?: IUser []    
    savedPosts?: IPost []
    // stories?: IStory)[]     

    isPrivate?: boolean

    createdAt?: Date
    updatedAt?: Date
}