/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LlmResponseDocument = LlmResponse & Document;

@Schema({ timestamps: true })
export class LlmResponse {
  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true })
  response: string;

  @Prop()
  model: string;

  @Prop()
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export const LlmResponseSchema = SchemaFactory.createForClass(LlmResponse);
