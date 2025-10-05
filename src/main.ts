import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser:false
  });
  app.enableCors({
    origin:"*"
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
