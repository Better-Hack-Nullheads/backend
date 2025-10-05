import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
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
    MongooseModule.forRoot('mongodb://localhost:27017/autoDocDb'),
    LlmResponseModule,
    AutoDocModule.forRoot({
      baseUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
      enabled: process.env.AUTODOC_ENABLED === 'true',
    }),
  ],
})
export class AppModule {}