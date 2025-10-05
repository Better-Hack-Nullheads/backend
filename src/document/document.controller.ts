import { Controller, Get, Param, Query } from '@nestjs/common';
import { DocumentService } from './document.service.js';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('latest')
  async getLatestDocuments(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.documentService.getLatestDocuments(limitNum);
  }

  @Get('run/:runId')
  async getDocumentsByRunId(@Param('runId') runId: string) {
    return this.documentService.getDocumentsByRunId(runId);
  }

  @Get('count')
  async getDocumentCount() {
    return { count: await this.documentService.getDocumentCount() };
  }

  @Get('chunk-times')
  async getUniqueChunkTimes() {
    return this.documentService.getUniqueChunkTimes();
  }

  @Get('chunk/:chunkTime')
  async getDocumentsByChunkTime(@Param('chunkTime') chunkTime: string) {
    return this.documentService.getDocumentsByChunkTime(chunkTime);
  }
}
