import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documentation } from './schemas/documentation.schema.js';

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

  async getUniqueChunkTimes(): Promise<string[]> {
    const result = await this.documentationModel
      .distinct('metadata.chunkTimestamp')
      .exec();
    return result
      .filter((time) => time != null)
      .sort()
      .reverse();
  }

  async getDocumentsByChunkTime(chunkTime: string): Promise<Documentation[]> {
    return this.documentationModel
      .find({ 'metadata.chunkTimestamp': chunkTime })
      .sort({ timestamp: -1 })
      .exec();
  }

  async updateDocumentContent(
    id: string,
    content: string,
  ): Promise<Documentation | null> {
    return this.documentationModel
      .findByIdAndUpdate(id, { content }, { new: true })
      .exec();
  }
}
