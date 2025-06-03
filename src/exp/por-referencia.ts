import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ collection: 'posts' })
export class Post extends Document {
    @Prop({ type: String, required: true })
    titulo: string

    @Prop({ type: String, required: true })
    contenido: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    autor: string
}

export const PostSchema = SchemaFactory.createForClass(Post);

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop({ type: String, required: true })
    nombre: string

    @Prop({ type: String, unique: true, required: true })
    email: string

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Post' })
    posts: Post[]
}

export const UserSchema = SchemaFactory.createForClass(User);

// const posts = await PostModel.find({ autor: userId });
// const userWithPosts = await UserModel.findOne({ email: 'usuario@example.com' }).populate('posts');
