import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LlmResponse,
  LlmResponseDocument,
} from './schemas/llm-response.schema';
import { CreateLlmResponseDto } from './dto/create-llm-response.dto';
import { UpdateLlmResponseDto } from './dto/update-llm-response.dto';

@Injectable()
export class LlmResponseService {
  constructor(
    @InjectModel(LlmResponse.name)
    private readonly llmResponseModel: Model<LlmResponseDocument>,
  ) {}

  // Create a new LLM response
  async create(dto: CreateLlmResponseDto): Promise<LlmResponse> {
    const created = new this.llmResponseModel(dto);
    return created.save();
  }

  // Get all LLM responses
  async findAll(): Promise<LlmResponse[]> {
    return this.llmResponseModel.find().exec();
  }

  // Get a single LLM response by ID
  async findOne(id: string): Promise<LlmResponse> {
    const doc = await this.llmResponseModel.findById(id).exec();
    if (!doc) throw new NotFoundException('LLM response not found');
    return doc;
  }

  // Update a LLM response by ID
  async update(id: string, dto: UpdateLlmResponseDto): Promise<LlmResponse> {
    const updated = await this.llmResponseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('LLM response not found');
    return updated;
  }

  // Delete a LLM response by ID
  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.llmResponseModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('LLM response not found');
    return { deleted: true };
  }
}
