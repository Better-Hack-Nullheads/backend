# AutoDocGen Universal - Professional Route Detection Improvement Plan

## 🚨 Current Problems (Why Hardcoding is Bad)

### 1. **Hardcoded Route Patterns in NPM Package**

```typescript
// ❌ BAD: Hardcoded regex patterns in generic-extractor.ts
const routePatterns = [
  /app\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`],\s*([^,)]+)/g,
  /router\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`],\s*([^,)]+)/g,
  /@(Get|Post|Put|Delete|Patch)\(['"`]([^'"`]*)['"`]\)/g,
];
```

**Problem**: This npm package assumes specific framework patterns instead of dynamically discovering them.

### 2. **NPM Package Framework Assumptions**

- Assumes specific decorator patterns (NestJS, Express, etc.)
- Doesn't work with custom decorators or new frameworks
- Breaks when frameworks update their patterns
- Not truly "universal" as claimed

### 3. **No Dynamic Framework Discovery**

- Hardcoded framework detection logic
- Ignores TypeScript's `reflect-metadata` capabilities
- Doesn't use AST analysis for framework detection
- Misses framework-specific route information

## 🎯 How Professional NPM Packages Actually Work

### 1. **Dynamic Framework Detection in NPM Packages**

```typescript
// ✅ GOOD: Dynamic framework detection for npm packages
import { Project, SourceFile } from 'ts-morph';

class FrameworkDetector {
  detectFramework(sourceFile: SourceFile): string {
    // Analyze imports to detect framework
    const imports = sourceFile.getImportDeclarations();

    if (
      imports.some((imp) => imp.getModuleSpecifierValue().includes('@nestjs'))
    ) {
      return 'nestjs';
    }
    if (
      imports.some((imp) => imp.getModuleSpecifierValue().includes('express'))
    ) {
      return 'express';
    }
    // Dynamic detection, not hardcoded
    return 'unknown';
  }
}
```

### 2. **AST-Based Analysis for NPM Packages**

```typescript
// ✅ GOOD: Deep AST analysis for npm packages
import {
  Project,
  SourceFile,
  ClassDeclaration,
  MethodDeclaration,
} from 'ts-morph';

class ASTAnalyzer {
  analyzeProject(projectPath: string): RouteInfo[] {
    const project = new Project({
      tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });
    const sourceFiles = project.getSourceFiles();

    return sourceFiles.flatMap((sourceFile) =>
      this.extractRoutesFromFile(sourceFile),
    );
  }

  private extractRoutesFromFile(sourceFile: SourceFile): RouteInfo[] {
    const routes: RouteInfo[] = [];

    sourceFile.getClasses().forEach((classDecl) => {
      classDecl.getMethods().forEach((method) => {
        const decorators = method.getDecorators();
        const parameters = method.getParameters();
        const returnType = method.getReturnTypeNode();

        // Extract route information from AST
        routes.push(
          this.buildRouteInfo(decorators, method, parameters, returnType),
        );
      });
    });

    return routes;
  }
}
```

### 3. **Universal NPM Package Interface**

```typescript
// ✅ GOOD: Universal interface for npm packages
interface UniversalRouteInfo {
  path: string;
  method: string;
  handler: string;
  parameters: ParameterInfo[];
  returnType: string;
  middleware: string[];
  framework: string;
  source: 'decorator' | 'ast' | 'metadata';
  confidence: number;
}
```

## 🛠️ Implementation Plan for NPM Package

### Phase 1: Dynamic Framework Detection

#### 1.1 Smart Framework Detection

```typescript
// src/core/dynamic-framework-detector.ts
import { Project, SourceFile } from 'ts-morph';

export class DynamicFrameworkDetector {
  detectFramework(projectPath: string): FrameworkInfo {
    const project = new Project({
      tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });
    const sourceFiles = project.getSourceFiles();

    const frameworkScores = new Map<string, number>();

    sourceFiles.forEach((sourceFile) => {
      const imports = sourceFile.getImportDeclarations();

      // Score frameworks based on imports
      imports.forEach((imp) => {
        const moduleName = imp.getModuleSpecifierValue();
        if (moduleName.includes('@nestjs'))
          frameworkScores.set(
            'nestjs',
            (frameworkScores.get('nestjs') || 0) + 1,
          );
        if (moduleName.includes('express'))
          frameworkScores.set(
            'express',
            (frameworkScores.get('express') || 0) + 1,
          );
        if (moduleName.includes('fastify'))
          frameworkScores.set(
            'fastify',
            (frameworkScores.get('fastify') || 0) + 1,
          );
        if (moduleName.includes('koa'))
          frameworkScores.set('koa', (frameworkScores.get('koa') || 0) + 1);
      });
    });

    const detectedFramework =
      Array.from(frameworkScores.entries()).sort(
        ([, a], [, b]) => b - a,
      )[0]?.[0] || 'unknown';

    return {
      framework: detectedFramework,
      confidence: this.calculateConfidence(frameworkScores),
      indicators: Array.from(frameworkScores.keys()),
    };
  }
}
```

#### 1.2 Universal AST Analysis for NPM Package

```typescript
// src/core/universal-ast-analyzer.ts
import {
  Project,
  SourceFile,
  ClassDeclaration,
  MethodDeclaration,
  Decorator,
} from 'ts-morph';

export class UniversalASTAnalyzer {
  analyzeProject(projectPath: string): RouteInfo[] {
    const project = new Project({
      tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });
    const sourceFiles = project.getSourceFiles();

    return sourceFiles.flatMap((sourceFile) =>
      this.extractRoutesFromFile(sourceFile),
    );
  }

  private extractRoutesFromFile(sourceFile: SourceFile): RouteInfo[] {
    const routes: RouteInfo[] = [];

    sourceFile.getClasses().forEach((classDecl) => {
      classDecl.getMethods().forEach((method) => {
        const methodDecorators = method.getDecorators();
        methodDecorators.forEach((decorator) => {
          const routeInfo = this.extractRouteFromDecorator(
            decorator,
            method,
            classDecl,
          );
          if (routeInfo) routes.push(routeInfo);
        });
      });
    });

    return routes;
  }

  private extractRouteFromDecorator(
    decorator: Decorator,
    method: MethodDeclaration,
    classDecl: ClassDeclaration,
  ): RouteInfo | null {
    const decoratorName = decorator.getName();
    const args = decorator.getArguments();

    // Universal decorator detection (not hardcoded)
    if (this.isHttpMethodDecorator(decoratorName)) {
      return {
        path: this.extractPathFromArgs(args),
        method: this.extractHttpMethod(decoratorName),
        handler: method.getName(),
        parameters: this.extractMethodParameters(method),
        returnType: this.extractReturnType(method),
        middleware: this.extractMiddleware(method),
        framework: this.detectFrameworkFromContext(classDecl),
        source: 'ast',
        confidence: 0.9,
      };
    }

    return null;
  }
}
```

### Phase 2: Framework Detection & Adaptation

#### 2.1 Dynamic Framework Detection

```typescript
// src/core/framework-adapters.ts
export interface FrameworkAdapter {
  name: string;
  detect(sourceFile: SourceFile): boolean;
  extractRoutes(sourceFile: SourceFile): RouteInfo[];
  extractControllers(sourceFile: SourceFile): ControllerInfo[];
}

export class NestJSAdapter implements FrameworkAdapter {
  name = 'nestjs';

  detect(sourceFile: SourceFile): boolean {
    return sourceFile
      .getImportDeclarations()
      .some((imp) => imp.getModuleSpecifierValue().includes('@nestjs'));
  }

  extractRoutes(sourceFile: SourceFile): RouteInfo[] {
    // NestJS-specific extraction logic
    return this.extractNestJSRoutes(sourceFile);
  }
}

export class ExpressAdapter implements FrameworkAdapter {
  name = 'express';

  detect(sourceFile: SourceFile): boolean {
    return sourceFile
      .getImportDeclarations()
      .some((imp) => imp.getModuleSpecifierValue().includes('express'));
  }

  extractRoutes(sourceFile: SourceFile): RouteInfo[] {
    // Express-specific extraction logic
    return this.extractExpressRoutes(sourceFile);
  }
}
```

#### 2.2 Adapter Registry

```typescript
// src/core/adapter-registry.ts
export class AdapterRegistry {
  private adapters: FrameworkAdapter[] = [
    new NestJSAdapter(),
    new ExpressAdapter(),
    new FastifyAdapter(),
    new KoaAdapter(),
  ];

  getAdapter(sourceFile: SourceFile): FrameworkAdapter | null {
    return this.adapters.find((adapter) => adapter.detect(sourceFile)) || null;
  }

  registerAdapter(adapter: FrameworkAdapter): void {
    this.adapters.push(adapter);
  }
}
```

### Phase 3: Universal Route Extraction

#### 3.1 Smart Route Discovery

```typescript
// src/core/universal-route-extractor.ts
export class UniversalRouteExtractor {
  constructor(
    private metadataExtractor: MetadataExtractor,
    private astAnalyzer: ASTAnalyzer,
    private adapterRegistry: AdapterRegistry,
  ) {}

  extractRoutes(sourceFile: SourceFile): RouteInfo[] {
    const routes: RouteInfo[] = [];

    // Strategy 1: Runtime metadata (most accurate)
    routes.push(...this.extractFromMetadata(sourceFile));

    // Strategy 2: Framework-specific adapter
    const adapter = this.adapterRegistry.getAdapter(sourceFile);
    if (adapter) {
      routes.push(...adapter.extractRoutes(sourceFile));
    }

    // Strategy 3: AST analysis (fallback)
    routes.push(...this.extractFromAST(sourceFile));

    return this.deduplicateRoutes(routes);
  }

  private extractFromMetadata(sourceFile: SourceFile): RouteInfo[] {
    // Extract from reflect-metadata
    return this.metadataExtractor.extractRoutes(sourceFile);
  }

  private extractFromAST(sourceFile: SourceFile): RouteInfo[] {
    // Extract from AST analysis
    return this.astAnalyzer.extractRoutes(sourceFile);
  }
}
```

### Phase 4: Type-Safe Route Information

#### 4.1 Enhanced Type Extraction

```typescript
// src/types/route-types.ts
export interface RouteInfo {
  path: string;
  method: string;
  handler: string;
  parameters: ParameterInfo[];
  returnType: TypeInfo;
  middleware: MiddlewareInfo[];
  framework: string;
  source: 'metadata' | 'adapter' | 'ast';
  confidence: number;
}

export interface ParameterInfo {
  name: string;
  type: TypeInfo;
  decorator?: string;
  optional: boolean;
  description?: string;
}

export interface TypeInfo {
  name: string;
  isArray: boolean;
  isOptional: boolean;
  properties?: PropertyInfo[];
  enum?: string[];
}
```

#### 4.2 Schema Generation

```typescript
// src/core/schema-generator.ts
export class SchemaGenerator {
  generateOpenAPISchema(routes: RouteInfo[]): OpenAPISchema {
    return {
      openapi: '3.0.0',
      info: { title: 'API', version: '1.0.0' },
      paths: this.generatePaths(routes),
      components: this.generateComponents(routes),
    };
  }

  private generatePaths(routes: RouteInfo[]): Record<string, any> {
    const paths: Record<string, any> = {};

    routes.forEach((route) => {
      if (!paths[route.path]) {
        paths[route.path] = {};
      }

      paths[route.path][route.method.toLowerCase()] = {
        summary: this.generateSummary(route),
        parameters: this.generateParameters(route.parameters),
        responses: this.generateResponses(route.returnType),
      };
    });

    return paths;
  }
}
```

## 🚀 Migration Strategy for NPM Package

### Step 1: Replace Hardcoded Patterns

```bash
# Update the npm package structure
cd auto-doc-gen-universal/src
mkdir core/dynamic
touch core/dynamic/framework-detector.ts
touch core/dynamic/ast-analyzer.ts
touch core/dynamic/route-extractor.ts
```

### Step 2: Update Generic Extractor

```typescript
// Replace hardcoded patterns in generic-extractor.ts
export class GenericExtractor {
  private frameworkDetector: DynamicFrameworkDetector;
  private astAnalyzer: UniversalASTAnalyzer;

  constructor(projectPath: string) {
    this.frameworkDetector = new DynamicFrameworkDetector();
    this.astAnalyzer = new UniversalASTAnalyzer();
    this.project = new Project({
      tsConfigFilePath: `${projectPath}/tsconfig.json`,
    });
  }

  extractAll(): AnalysisResult {
    // Detect framework dynamically
    const frameworkInfo = this.frameworkDetector.detectFramework(
      this.projectPath,
    );

    // Extract routes using AST analysis (no hardcoded patterns)
    const routes = this.astAnalyzer.analyzeProject(this.projectPath);

    return {
      framework: frameworkInfo.framework,
      routes,
      controllers: this.extractControllers(),
      services: this.extractServices(),
      types: this.extractTypes(),
    };
  }
}
```

### Step 3: Update CLI Commands

```typescript
// Update CLI to use dynamic detection
program
  .command('analyze')
  .description('Analyze TypeScript project dynamically')
  .argument('<path>', 'Project path to analyze')
  .action(async (projectPath) => {
    const analyzer = new UniversalAnalyzer(projectPath);
    const result = await analyzer.analyze();

    console.log(`🔍 Detected framework: ${result.framework}`);
    console.log(`📊 Found: ${result.routes.length} routes`);
  });
```

### Step 4: Add NPM Package Configuration

```json
// package.json updates
{
  "name": "@auto-doc-gen/universal",
  "description": "Universal TypeScript framework documentation generator",
  "main": "dist/index.js",
  "bin": {
    "auto-doc-gen-universal": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

## 📊 Expected Benefits for NPM Package

### 1. **True Universal Support**

- ✅ 95%+ route detection accuracy across all frameworks
- ✅ Dynamic framework detection (no hardcoding)
- ✅ Proper parameter type extraction from AST
- ✅ Correct return type inference

### 2. **NPM Package Quality**

- ✅ Works with any TypeScript project
- ✅ No framework-specific assumptions
- ✅ Easy installation: `npm install @auto-doc-gen/universal`
- ✅ CLI usage: `npx auto-doc-gen-universal analyze .`

### 3. **Professional NPM Package Standards**

- ✅ No hardcoded patterns or assumptions
- ✅ Framework-agnostic core architecture
- ✅ Easy to extend for new frameworks
- ✅ Self-updating with framework changes
- ✅ Proper TypeScript definitions

### 4. **Industry-Standard Output**

- ✅ OpenAPI 3.0 compliance
- ✅ Type-safe route information
- ✅ Professional documentation generation
- ✅ AST-based analysis (like professional tools)

## 🎯 Success Metrics for NPM Package

1. **Route Detection**: 95%+ accuracy across all TypeScript frameworks
2. **Type Safety**: 100% type information extraction from AST
3. **Performance**: <2s analysis time for 1000+ routes
4. **Extensibility**: <1 hour to add new framework support
5. **NPM Package Quality**: Professional-grade, truly universal tool
6. **Documentation Quality**: Industry-standard OpenAPI specs

## 📚 References for NPM Package Development

- [TypeScript AST Analysis](https://ts-morph.com/)
- [NPM Package Best Practices](https://docs.npmjs.com/packages-and-modules)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Professional API Documentation Tools](https://scalar.com/)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)

---

**This plan transforms the npm package from a hardcoded, framework-specific tool into a truly universal, professional-grade route detection system that works like Scalar and other industry-leading tools.**
