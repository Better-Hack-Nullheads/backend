import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentationDocument = Documentation & Document;

@Schema({ collection: 'documentation' })
export class Documentation {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ type: Object })
  metadata: any;

  @Prop()
  runId: string;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);
