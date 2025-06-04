import { IUser } from 'src/user/application/entity/user.interface'

export interface IPost {
    idPost: string
    idAuthor: IUser
    mediaUrlImage: string[]
    mediaUrlVideo: string[]
    likeCount: number
    caption?: string 
    createdAt?: Date
    //isLikedByCurrentUser?: boolean
}