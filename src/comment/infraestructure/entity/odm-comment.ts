import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmPost } from "src/post/infraestructure/entity/odm-post";
import { OdmUser } from "src/user/infraestructure/entity/odm-user";

@Schema({ collection: 'comments', timestamps: true })
export class OdmComment extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    idComment: string;  

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    idAuthor: OdmUser;  

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmPost', required: true, index: true })
    post: OdmPost;

    @Prop({ type: String, required: true, maxlength: 1000 })
    text: string;

    @Prop({ type: Date, required: true })
    createdAt: Date;

}

export const OdmCommentSchema = SchemaFactory.createForClass(OdmComment);

