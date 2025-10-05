// src/autodoc/autodoc.module.ts
import { DynamicModule, Module, Global } from '@nestjs/common';
import { AutodocController } from './autodoc.controller.js';
import { DiscoveryModule } from '@nestjs/core';

export interface AutoDocModuleOptions {
  baseUrl?: string;
  enabled?: boolean;
}

export interface AutoDocModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<AutoDocModuleOptions> | AutoDocModuleOptions;
  inject?: any[];
  imports?: any[];
}

@Global()
@Module({})
export class AutoDocModule {
  static forRoot(options: AutoDocModuleOptions = {}): DynamicModule {
    return {
      module: AutoDocModule,
      imports: [DiscoveryModule],
      providers: [
        {
          provide: 'AUTODOC_OPTIONS',
          useValue: {
            baseUrl: options.baseUrl || 'http://localhost:3005',
            enabled: options.enabled !== false,
          },
        },
      ],
      controllers: [AutodocController],
    };
  }

  static forRootAsync(options: AutoDocModuleAsyncOptions): DynamicModule {
    return {
      module: AutoDocModule,
      imports: options.imports || [DiscoveryModule],
      providers: [
        {
          provide: 'AUTODOC_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      controllers: [AutodocController],
    };
  }
}
