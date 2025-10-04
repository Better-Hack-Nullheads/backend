import { AutoDocGenModule } from '@auto-doc-gen/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    AutoDocGenModule.forRoot({
      autoRun: true,
      verbose: true,
      colorOutput: true,
      sourcePath: './src',
      delay: 2000, // Wait 2 seconds after app starts
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
