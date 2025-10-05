import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documentation } from './schemas/documentation.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Documentation.name)
    private documentationModel: Model<Documentation>,
  ) {}

  async getLatestDocuments(limit: number = 10): Promise<Documentation[]> {
    return this.documentationModel
      .find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .exec();
  }

  async getDocumentsByRunId(runId: string): Promise<Documentation[]> {
    return this.documentationModel
      .find({ 'metadata.runId': runId })
      .sort({ timestamp: -1 })
      .exec();
  }

  async getDocumentCount(): Promise<number> {
    return this.documentationModel.countDocuments().exec();
  }
}
