import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ collection: 'users', timestamps: true })
export class OdmUser extends Document {
    @Prop({ type: String, unique: true, required: true, index: true })
    idUser: string; 

    @Prop({ type: String, unique: true, required: true, trim: true, lowercase: true })
    username: string;

    @Prop({ type: String, unique: true, required: true, trim: true, lowercase: true })
    email: string;

    @Prop({ type: String, required: true }) 
    password: string;

    @Prop({ type: String, trim: true })
    fullName: string;

    @Prop({ type: String, maxlength: 150 })
    bio?: string;

    @Prop({ type: String }) 
    profilePictureUrl?: string;

    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;


}

export const OdmUserSchema = SchemaFactory.createForClass(OdmUser);
// OdmUserSchema.index({ username: 'text' });