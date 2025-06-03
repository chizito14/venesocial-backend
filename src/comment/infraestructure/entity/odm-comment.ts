import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmPost } from "src/post/insfraestructure/entity/odm-post";
import { OdmUser } from "src/user/infrastructure/entity/odm-user";


export type OdmCommentDocument = OdmComment & Document;

@Schema({ collection: 'comments', timestamps: true })
export class OdmComment extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    uuid: string;  

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    user: OdmUser;  

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmPost', required: true, index: true })
    post: OdmPost;

    @Prop({ type: String, required: true, maxlength: 1000 })
    text: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser' }] })
    likedBy: OdmUser[]; 

    @Prop({ type: Number, default: 0 })
    likeCount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmComment' })
    parentComment?: OdmComment; // Para comentarios anidados/respuestas

    // timestamps: true añadirá createdAt y updatedAt automáticamente
}

export const OdmCommentSchema = SchemaFactory.createForClass(OdmComment);

OdmCommentSchema.pre<OdmCommentDocument>('save', function (next) {
    if (this.isModified('likedBy')) {
        this.likeCount = this.likedBy.length;
    }
    next();
});