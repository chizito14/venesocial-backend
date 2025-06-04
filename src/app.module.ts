import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './_core/infraestructure/provider/moongose-db-provider';
import { ExpController } from './exp/exp.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: " mariasal "  ,
      signOptions: { expiresIn: "24h" },
    })

  ],
  controllers: [
    ExpController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
