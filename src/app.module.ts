import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';
import { LlmResponseModule } from './llm-response/llm-response.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Same database connection for both LLM responses and auto-doc-gen data
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/autoDocDb',
    ),
    LlmResponseModule,
    DocumentModule,
  ],
})
export class AppModule {}
