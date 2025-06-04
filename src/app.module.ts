import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './_core/infraestructure/provider/moongose-db-provider';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
import { PostController } from './post/infraestructure/controller/post.controller';
import { UserController } from './user/infraestructure/controller/user.controller';
import { CommentController } from './post/infraestructure/controller/comment.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: " mariasal "  ,
      signOptions: { expiresIn: "24h" },
    })

  ],
  controllers: [
    AuthController,
    PostController,
    UserController,
    CommentController,
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
