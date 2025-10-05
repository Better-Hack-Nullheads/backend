import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  // Enable CORS
  app.enableCors({
    origin: '*',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Better Hack API')
    .setDescription('API documentation for Better Hack backend')
    .setVersion('1.0')
    .addTag('documents', 'Document management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger UI is available at: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();
