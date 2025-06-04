import { IUser } from 'src/user/application/entity/user.interface'

export interface IPost {
    idPost: string
    idAuthor: IUser
    mediaUrl: string
    caption?: string
    likeCount: number 
    createdAt?: Date
    //isLikedByCurrentUser?: boolean
}