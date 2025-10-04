import { Injectable } from '@nestjs/common';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';

@Injectable()
export class PlaygroundService {
  create(createPlaygroundDto: CreatePlaygroundDto) {
    return 'This action adds a new playground';
  }

  findAll() {
    return `This action returns all playground`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playground`;
  }

  update(id: number, updatePlaygroundDto: UpdatePlaygroundDto) {
    return `This action updates a #${id} playground`;
  }

  remove(id: number) {
    return `This action removes a #${id} playground`;
  }
}
