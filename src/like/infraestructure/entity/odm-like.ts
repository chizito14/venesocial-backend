import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OdmLikeDocument = OdmLike & Document;

@Schema({ collection: 'likes', timestamps: true })
export class OdmLike extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    idLike: string; 

    @Prop({ type: String,  required: true,  })
    idAuthor: string;

}

export const OdmLikeSchema = SchemaFactory.createForClass(OdmLike);

