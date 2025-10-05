import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import {
  Documentation,
  DocumentationSchema,
} from './schemas/documentation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Documentation.name, schema: DocumentationSchema },
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
