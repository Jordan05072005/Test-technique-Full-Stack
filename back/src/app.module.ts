import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo:27017/${process.env.MONGO_DB}?authSource=admin`
    ),
    AuthModule,
  ],
})
export class AppModule {}
