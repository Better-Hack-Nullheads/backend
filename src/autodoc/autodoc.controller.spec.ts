import { Test, TestingModule } from '@nestjs/testing';
import { AutodocController } from './autodoc.controller';
import { AutodocService } from './autodoc.service';

describe('AutodocController', () => {
  let controller: AutodocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutodocController],
      providers: [AutodocService],
    }).compile();

    controller = module.get<AutodocController>(AutodocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
