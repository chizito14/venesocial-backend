import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseDataBaseProvider } from './moongose-db-provider';

@Module({
  imports: [
    JwtModule.register({
      secret: " mariasexual "  ,
      signOptions: { expiresIn: "24h" },
    })

  ],
  controllers: [],
  providers: [MongooseDataBaseProvider],
})
export class AppModule {}
