import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmComment } from "src/comment/infraestructure/entity/odm-comment";
import { OdmUser } from "src/user/infraestructure/entity/odm-user";



export type OdmPostDocument = OdmPost & Document;

export enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}

@Schema({ collection: 'posts', timestamps: true })
export class OdmPost extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    idPost: string; // 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    idAuthor: OdmUser; // 

    @Prop({ type: String, required: true })
    mediaUrl: string;  

    @Prop({ type: String, enum: MediaType, required: true })
    mediaType: MediaType;

    @Prop({ type: String, maxlength: 2200 })
    caption?: string;

    @Prop({ type: Number, default: 0 })
    likeCount: number;


}

export const OdmPostSchema = SchemaFactory.createForClass(OdmPost);
