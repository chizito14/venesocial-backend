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

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmPost' }] })
    // posts: OdmPost[]; // Publicaciones hechas por el usuario

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser' }] })
    followers: OdmUser[]; // Usuarios que siguen a este usuario

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmUser' }] })
    following: OdmUser[]; // Usuarios a los que este usuario sigue

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmPost' }] })
    // savedPosts: OdmPost[]; // Publicaciones guardadas por el usuario

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OdmStory' }] })
    // stories: OdmStory[]; // Historias activas del usuario

    @Prop({ type: Boolean, default: false })
    isPrivate: boolean;

    @Prop({ type: Date, default: true })
    createdAt: Date;

    @Prop({ type: Date, default: true })
    updateAt: Date;

}

export const OdmUserSchema = SchemaFactory.createForClass(OdmUser);
OdmUserSchema.index({ username: 'text' });