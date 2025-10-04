import { Test, TestingModule } from '@nestjs/testing';
import { PlaygroundController } from './playground.controller';
import { PlaygroundService } from './playground.service';

describe('PlaygroundController', () => {
  let controller: PlaygroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaygroundController],
      providers: [PlaygroundService],
    }).compile();

    controller = module.get<PlaygroundController>(PlaygroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
