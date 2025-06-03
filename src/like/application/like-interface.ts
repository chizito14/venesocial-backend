import { Types } from 'mongoose';


export interface ILike {
    idLike: string;
    idAuthor: string; // Usuario que dio el like 
}