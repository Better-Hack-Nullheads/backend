import { AutoDocGenService } from '@auto-doc-gen/core';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly autoDocGenService: AutoDocGenService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('analyze')
  async analyzeProject() {
    await this.autoDocGenService.analyzeProject();
    return { message: 'Analysis completed' };
  }

  @Get('analysis-results')
  async getAnalysisResults() {
    return await this.autoDocGenService.getAnalysisResults();
  }
}
