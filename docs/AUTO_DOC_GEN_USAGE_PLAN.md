# AutoDocGen Package Usage Plan

## Overview

Use the `@auto-doc-gen/core` package to analyze your NestJS backend project and generate documentation for controllers and services.

## Current Setup Status ✅

- ✅ AutoDocGen package created in `../auto-doc-gen/`
- ✅ Backend NestJS project with Products controller
- ✅ Package ready to analyze NestJS code

## Action Plan - How to Use AutoDocGen on Your Backend

### 1. Build the AutoDocGen Package

```bash
# Navigate to auto-doc-gen directory
cd ../auto-doc-gen

# Build the package
npm run build

# Verify build succeeded
ls dist/
```

### 2. Install AutoDocGen Globally (Option A - Recommended)

```bash
# From auto-doc-gen directory
npm install -g .

# Verify installation
auto-doc-gen --help
```

### 3. Use AutoDocGen to Analyze Your Backend

#### **Navigate to Backend Directory:**

```bash
cd ../backend
```

#### **Analyze Your NestJS Project:**

```bash
# Basic analysis of your src folder
auto-doc-gen analyze ./src

# With verbose output to see detailed processing
auto-doc-gen analyze ./src --verbose

# Include private methods in analysis
auto-doc-gen analyze ./src --include-private

# No colors (useful for CI/CD)
auto-doc-gen analyze ./src --no-color
```

### 4. Expected Output Analysis

#### **What AutoDocGen Will Find:**

- ✅ **AppController** - Your main app controller
- ✅ **AppService** - Your main app service
- ✅ **ProductsController** - Your new products controller
- ✅ **ProductsService** - Your new products service

#### **Sample Expected Output:**

```
🔍 AutoDocGen Analysis Results
================================

📁 Controllers Found: 2
📁 Services Found: 2

🎯 AppController (C:/backend/src/app.controller.ts)
   Base Path: /

   Methods:
   ├── GET /
   │   ├── Parameters: []
   │   └── Return Type: string

🎯 ProductsController (C:/backend/src/products/products.controller.ts)
   Base Path: /products

   Methods:
   ├── POST /products
   │   ├── Parameters: [body: CreateProductDto]
   │   └── Return Type: Product

   ├── GET /products
   │   ├── Parameters: []
   │   └── Return Type: Product[]

   ├── GET /products/:id
   │   ├── Parameters: [id: string]
   │   └── Return Type: Product

   ├── PATCH /products/:id
   │   ├── Parameters: [id: string, body: UpdateProductDto]
   │   └── Return Type: Product

   └── DELETE /products/:id
       ├── Parameters: [id: string]
       └── Return Type: { message: string }

🔧 AppService (C:/backend/src/app.service.ts)
   Dependencies: []

   Methods:
   ├── getHello()
   │   ├── Parameters: []
   │   └── Return Type: string

🔧 ProductsService (C:/backend/src/products/products.service.ts)
   Dependencies: []

   Methods:
   ├── create(createProductDto: CreateProductDto)
   │   ├── Parameters: [createProductDto: CreateProductDto]
   │   └── Return Type: Product

   ├── findAll()
   │   ├── Parameters: []
   │   └── Return Type: Product[]

   ├── findOne(id: string)
   │   ├── Parameters: [id: string]
   │   └── Return Type: Product | undefined

   ├── update(id: string, updateProductDto: UpdateProductDto)
   │   ├── Parameters: [id: string, updateProductDto: UpdateProductDto]
   │   └── Return Type: Product | undefined

   └── remove(id: string)
       ├── Parameters: [id: string]
       └── Return Type: boolean

📊 Summary:
   • Total Controllers: 2
   • Total Services: 2
   • Total Controller Methods: 6
   • Total Service Methods: 5
   • Analysis completed in 0.3s
```

### 5. Alternative Usage Methods

#### **Option B: Use as Local Package**

```bash
# From auto-doc-gen directory
npm link

# From backend directory
npm link @auto-doc-gen/core

# Then use directly
npx auto-doc-gen analyze ./src
```

#### **Option C: Use Programmatically**

```typescript
// Create a script in your backend project
import { AutoDocGen } from '@auto-doc-gen/core';

async function analyzeProject() {
  const analyzer = new AutoDocGen({
    verbose: true,
    colorOutput: true,
    includePrivate: false,
  });

  await analyzer.analyze('./src');
}

analyzeProject();
```

### 6. Integration with Your Workflow

#### **Add to package.json Scripts:**

```json
{
  "scripts": {
    "analyze": "auto-doc-gen analyze ./src",
    "analyze:verbose": "auto-doc-gen analyze ./src --verbose",
    "docs": "auto-doc-gen analyze ./src > docs/analysis.txt"
  }
}
```

#### **Use in Development:**

```bash
# Quick analysis during development
npm run analyze

# Detailed analysis for documentation
npm run analyze:verbose

# Save analysis to file
npm run docs
```

### 7. Continuous Integration

#### **Add to CI/CD Pipeline:**

```yaml
# Example GitHub Actions step
- name: Analyze NestJS Code
  run: |
    cd auto-doc-gen
    npm run build
    npm install -g .
    cd ../backend
    auto-doc-gen analyze ./src --no-color
```

### 8. Custom Analysis Scenarios

#### **Analyze Specific Modules:**

```bash
# Analyze only products module
auto-doc-gen analyze ./src/products

# Analyze with specific options
auto-doc-gen analyze ./src --verbose --include-private --no-color
```

#### **Generate Documentation Files:**

```bash
# Save analysis to markdown file
auto-doc-gen analyze ./src > docs/api-analysis.md

# Save with timestamp
auto-doc-gen analyze ./src > "docs/analysis-$(date +%Y%m%d).md"
```

## Quick Start Commands

```bash
# 1. Build the package
cd ../auto-doc-gen && npm run build

# 2. Install globally
npm install -g .

# 3. Analyze your backend
cd ../backend
auto-doc-gen analyze ./src

# 4. Get detailed analysis
auto-doc-gen analyze ./src --verbose
```

## Troubleshooting

### **Package not found:**

- Ensure you built the package first (`npm run build`)
- Check if global installation succeeded
- Try using `npx` instead: `npx auto-doc-gen analyze ./src`

### **No controllers/services found:**

- Verify you're in the correct directory
- Check that your NestJS files have proper decorators
- Use `--verbose` flag to see file processing details

### **TypeScript compilation errors:**

- Ensure your backend project compiles successfully
- Check for syntax errors in your NestJS files
- AutoDocGen needs valid TypeScript to parse

---

**Your AutoDocGen package is ready to analyze your NestJS backend and generate comprehensive documentation!**
