import { Types } from 'mongoose'; // Para ObjectId


export interface IUser {
    iduser: string; // Tu identificador único personalizado
    username: string;
    email: string;
    password: string;
    fullName?: string;
    bio?: string;
    profilePictureUrl?: string;

    posts?: (IPost)[];         
    followers?: (IUser )[];
    following?: (IUser )[];    
    savedPosts?: (IPost )[];
    stories?: (IStory)[];     

    isPrivate?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}