import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  ConfigService } from '@nestjs/config';
import { auth } from './lib/auth.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { DocumentModule } from './document/document.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere
    }),
    AuthModule.forRoot({ auth }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URL') || 'mongodb://localhost:27017/mydb',

      })

    }),
    DocumentModule,
  ],
})
export class AppModule {}