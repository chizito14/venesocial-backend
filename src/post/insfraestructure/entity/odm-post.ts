import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmComment } from "src/coment/insfraestructure/entity/odm-coment";
import { OdmUser } from "src/user/infrastructure/entity/odm-user";


export type OdmPostDocument = OdmPost & Document;

export enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}

@Schema({ collection: 'posts', timestamps: true })
export class OdmPost extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    uuid: string; // 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    user: OdmUser; // 

    @Prop({ type: String, required: true })
    mediaUrl: string;  

    @Prop({ type: String, enum: MediaType, required: true })
    mediaType: MediaType;

    @Prop({ type: String, maxlength: 2200 })
    caption?: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser' }] })
    likedBy: OdmUser[]; 

    @Prop({ type: Number, default: 0 })
    likeCount: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmComment' }] })
    comments: OdmComment[]; // Comentarios en la publicación

    @Prop({ type: Number, default: 0 })
    commentCount: number;

    @Prop({ type: String })
    location?: string;

}

export const OdmPostSchema = SchemaFactory.createForClass(OdmPost);

// Actualizar likeCount antes de guardar (ejemplo de hook)
OdmPostSchema.pre<OdmPostDocument>('save', function (next) {
    if (this.isModified('likedBy')) {
        this.likeCount = this.likedBy.length;
    }
    next();
});