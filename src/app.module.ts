import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './_core/infraestructure/provider/moongose-db-provider';

@Module({
  imports: [
    JwtModule.register({
      secret: " mariasal "  ,
      signOptions: { expiresIn: "24h" },
    })

  ],
  controllers: [
    
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
