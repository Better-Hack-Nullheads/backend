import { Test, TestingModule } from '@nestjs/testing';
import { AutodocService } from './autodoc.service.js';

describe('AutodocService', () => {
  let service: AutodocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutodocService],
    }).compile();

    service = module.get<AutodocService>(AutodocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
