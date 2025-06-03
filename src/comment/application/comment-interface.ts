import { Types } from 'mongoose';


export interface IComment {
    idComment: string;
    idAuthor: string 
    post: string // 
    text: string;
    createdAt: Date;
    
}