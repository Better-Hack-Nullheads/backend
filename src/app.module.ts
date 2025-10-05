import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  ConfigService } from '@nestjs/config';
import { LlmResponseModule } from './llm-response/llm-response.module.js';
import { auth } from './lib/auth.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AutoDocModule } from './autodoc/autodoc.module.js';

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
        uri: config.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/mydb',

      })

    }),
    LlmResponseModule,
    AutoDocModule.forRoot({
      baseUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
      enabled: process.env.AUTODOC_ENABLED === 'true',
    }),
  ],
})
export class AppModule {}