import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmResponseService } from './llm-response.service';
import { LlmResponseController } from './llm-response.controller';
import { LlmResponse, LlmResponseSchema } from './schemas/llm-response.schema';

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
