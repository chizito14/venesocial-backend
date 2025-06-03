import { MediaType } from 'express';
import { Types } from 'mongoose';
import { IUser } from 'src/user/application/Iuser';


export interface IPost {
    uuid: string;
    user: IUser;
    mediaUrl: string;
    mediaType: MediaType;
    caption?: string;

    likeCount?: number; 
    isLikedByCurrentUser?: boolean;

    comments?: (IComment)[]; 
    commentCount?: number; 
    tags?: string[];
    location?: string;

    createdAt?: Date;
    updatedAt?: Date;
}