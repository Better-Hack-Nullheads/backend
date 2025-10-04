import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmResponseModule } from './llm-response/llm-response.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forRoot('mongodb://localhost:27017/autoDocDb'),
    LlmResponseModule,
  ],
})
export class AppModule {}
