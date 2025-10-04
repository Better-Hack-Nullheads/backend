import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';

@Controller('playground')
export class PlaygroundController {
  constructor(private readonly playgroundService: PlaygroundService) {}

  @Post()
  create(@Body() createPlaygroundDto: CreatePlaygroundDto) {
    return this.playgroundService.create(createPlaygroundDto);
  }

  @Get()
  findAll() {
    return this.playgroundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playgroundService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaygroundDto: UpdatePlaygroundDto) {
    return this.playgroundService.update(+id, updatePlaygroundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playgroundService.remove(+id);
  }
}
