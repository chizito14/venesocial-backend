import { IUser } from 'src/user/application/entity/user.interface'

export interface IPost {
    uuid: string
    user: IUser
    mediaUrl: string
    caption?: string

    likeCount?: number 
    isLikedByCurrentUser?: boolean

    //comments?: (IComment)[] 
    commentCount?: number 
    tags?: string[]
    location?: string

    createdAt?: Date
    updatedAt?: Date
}