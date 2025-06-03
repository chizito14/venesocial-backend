import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OdmUser } from "src/user/infrastructure/entity/odm-user";

export type OdmLikeDocument = OdmLike & Document;

@Schema({ collection: 'likes', timestamps: true })
export class OdmLike extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    uuid: string; 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser', required: true, index: true })
    user: OdmUser;

}

export const OdmLikeSchema = SchemaFactory.createForClass(OdmLike);

// Crear un índice compuesto para asegurar que un usuario solo pueda dar like una vez
// a un objeto específico. También optimiza la búsqueda de likes.
OdmLikeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });