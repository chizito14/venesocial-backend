import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'comments', timestamps: true })
export class OdmComment extends Document {

    @Prop({ type: String, unique: true, required: true, index: true })
    idComment: string  

    @Prop({ type: String, required: true, index: true })
    idAuthor: string  

    @Prop({ type: String, required: true, index: true })
    idPost: string

    @Prop({ type: String, required: true, maxlength: 1000 })
    text: string

    @Prop({ type: Date, required: true })
    createdAt: Date

}

export const OdmCommentSchema = SchemaFactory.createForClass(OdmComment);

