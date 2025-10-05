import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmResponseService } from './llm-response.service.js';
import { LlmResponseController } from './llm-response.controller.js';
import { LlmResponse, LlmResponseSchema } from './schemas/llm-response.schema.js';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    MongooseModule.forFeature([
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      { name: LlmResponse.name, schema: LlmResponseSchema },
    ]),
  ],
  controllers: [LlmResponseController],
  providers: [LlmResponseService],
})
export class LlmResponseModule {}
