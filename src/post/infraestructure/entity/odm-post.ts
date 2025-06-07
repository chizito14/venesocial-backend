import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'posts', timestamps: true })
export class OdmPost extends Document {

    @Prop({ type: String, unique: true, required: true, index: true })
    idPost: string 

    @Prop({ type: String, required: true, index: true })
    idAuthor: string 

    @Prop({ type: [String], required: false })
    mediaUrlImage?: string[]

    @Prop({ type: [String], required: false })
    mediaUrlVideo?: string[]
    
    @Prop({ type: String, maxlength: 2200 })
    caption?: string;

    @Prop({ type: Number, default: 0 })
    likeCount: number;

    @Prop({ type: Date, default: true })
    createdAt: Date;

}

export const OdmPostSchema = SchemaFactory.createForClass(OdmPost);
