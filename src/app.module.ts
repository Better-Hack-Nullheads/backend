import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmResponseModule } from './llm-response/llm-response.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    // Same database connection for both LLM responses and auto-doc-gen data
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forRoot('mongodb://localhost:27017/autoDocDb'),
    LlmResponseModule,
    DocumentModule,
  ],
})
export class AppModule {}
