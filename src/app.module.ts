import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaygroundModule } from './playground/playground.module';

@Module({
  imports: [PlaygroundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
