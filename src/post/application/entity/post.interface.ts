
export interface IPost {
    idPost: string
    idAuthor: string
    mediaUrlImage?: string[]
    mediaUrlVideo?: string[]
    likeCount: number
    caption?: string 
    createdAt?: Date
    //isLikedByCurrentUser?: boolean
}