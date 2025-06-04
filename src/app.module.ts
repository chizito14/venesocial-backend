import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './_core/infraestructure/provider/moongose-db-provider';
import { AuthController } from './auth/infraestructure/controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: " mariasal "  ,
      signOptions: { expiresIn: "24h" },
    })

  ],
  controllers: [
    AuthController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
