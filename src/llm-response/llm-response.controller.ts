import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LlmResponseService } from './llm-response.service.js';
import { CreateLlmResponseDto } from './dto/create-llm-response.dto.js';
import { UpdateLlmResponseDto } from './dto/update-llm-response.dto.js';

@Controller('llm-response')
export class LlmResponseController {
  constructor(private readonly llmResponseService: LlmResponseService) {}

  @Post()
  create(@Body() dto: CreateLlmResponseDto) {
    return this.llmResponseService.create(dto);
  }

  @Get()
  findAll() {
    return this.llmResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.llmResponseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLlmResponseDto) {
    return this.llmResponseService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.llmResponseService.remove(id);
  }
}
