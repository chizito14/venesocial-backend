import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'likes', timestamps: true })
export class OdmLike extends Document {
    
    @Prop({ type: String, unique: true, required: true, index: true })
    idPost: string; 

    @Prop({ type: String, unique: true, required: true, index: true  })
    idAuthor: string;

}

export const OdmLikeSchema = SchemaFactory.createForClass(OdmLike);

