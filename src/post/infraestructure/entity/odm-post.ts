import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmUser } from "src/user/infraestructure/entity/odm-user";

export enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}

@Schema({ collection: 'posts', timestamps: true })
export class OdmPost extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    idPost: string 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    idAuthor: OdmUser 

    @Prop({ type: String, required: true })
    mediaUrlImage: string[]

    @Prop({ type: String, required: true })
    mediaUrlVideo: string[]
    
    @Prop({ type: String, maxlength: 2200 })
    caption?: string;

    @Prop({ type: Number, default: 0 })
    likeCount: number;

    @Prop({ type: Date, default: true })
    createdAt: Date;

}

export const OdmPostSchema = SchemaFactory.createForClass(OdmPost);
