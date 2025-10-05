import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLlmResponseDto } from './dto/update-llm-response.dto';

@Injectable()
export class LlmResponseService {
  private llmResponses: any[] = []; // replace with actual DB or storage

  create(dto: any) {
    const id = `${Date.now()}`;
    const newRecord = { id, ...dto };
    this.llmResponses.push(newRecord);
    return newRecord;
  }

  findAll() {
    return this.llmResponses;
  }

  findOne(id: string) {
    const record = this.llmResponses.find(r => r.id === id);
    if (!record) throw new NotFoundException(`Record ${id} not found`);
    return record;
  }

  update(id: string, dto: UpdateLlmResponseDto) {
    const index = this.llmResponses.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException(`Record ${id} not found`);

    // Only update content or any other fields provided
    this.llmResponses[index] = { ...this.llmResponses[index], ...dto };
    return this.llmResponses[index];
  }

  remove(id: string) {
    const index = this.llmResponses.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException(`Record ${id} not found`);
    const removed = this.llmResponses.splice(index, 1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return removed[0];
  }
}
