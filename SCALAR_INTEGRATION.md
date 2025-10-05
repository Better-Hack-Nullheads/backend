# Scalar Integration Guide

## 🎯 Why Use Scalar Instead of Building Our Own

### Problems with Our Current Approach:

- ❌ Hardcoded route patterns
- ❌ Framework-specific assumptions
- ❌ Complex AST analysis needed
- ❌ Maintenance burden
- ❌ Not truly universal

### Scalar Benefits:

- ✅ **Professional-grade** API documentation
- ✅ **Automatic OpenAPI generation** from TypeScript
- ✅ **Framework-agnostic** - works with any TypeScript project
- ✅ **Industry standard** - used by major companies
- ✅ **Zero configuration** - works out of the box
- ✅ **Beautiful UI** - modern, interactive documentation

## 🚀 Quick Setup with Scalar

### Step 1: Install Scalar

```bash
# Install Scalar CLI
npm install -g @scalar/cli

# Or use npx (no installation needed)
npx @scalar/cli --help
```

### Step 2: Generate OpenAPI Spec from Your NestJS Project

```bash
# Generate OpenAPI spec from your existing NestJS project
npx @scalar/cli generate --input ./src --output ./docs/openapi.json

# Or use Swagger/OpenAPI decorators (recommended)
npm install @nestjs/swagger swagger-ui-express
```

### Step 3: Add Swagger to Your NestJS App

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Your API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### Step 4: Use Scalar UI

```bash
# Serve your API docs with Scalar UI
npx @scalar/cli serve --input ./docs/openapi.json --port 3001
```

## 🎨 Enhanced NestJS Controllers with Swagger

### Example: Users Controller

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
```

### Example: DTOs with Swagger

```typescript
// users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsString()
  phone?: string;
}
```

## 🌐 Scalar UI Integration

### Option 1: Use Scalar's Hosted Service

```bash
# Generate OpenAPI spec
npx @scalar/cli generate --input ./src --output ./docs/openapi.json

# Upload to Scalar (free tier available)
npx @scalar/cli deploy --input ./docs/openapi.json
```

### Option 2: Self-hosted Scalar

```typescript
// Add Scalar UI to your NestJS app
import { ScalarApiReference } from '@scalar/nestjs-api-reference';

@Module({
  imports: [
    ScalarApiReference.forRoot({
      spec: {
        url: '/api-json', // Your OpenAPI JSON endpoint
      },
    }),
  ],
})
export class AppModule {}
```

### Option 3: Standalone Scalar Server

```bash
# Create a simple server to serve your OpenAPI spec
npx @scalar/cli serve --input ./docs/openapi.json --port 3001

# Access at http://localhost:3001
```

## 📊 Comparison: Our Tool vs Scalar

| Feature                   | Our Tool           | Scalar                      |
| ------------------------- | ------------------ | --------------------------- |
| **Route Detection**       | Hardcoded patterns | Automatic from decorators   |
| **Type Safety**           | Manual extraction  | Built-in TypeScript support |
| **UI Quality**            | Basic markdown     | Professional, interactive   |
| **Maintenance**           | High (custom code) | Zero (industry standard)    |
| **Framework Support**     | Limited            | Universal                   |
| **Documentation Quality** | Basic              | Professional grade          |
| **Setup Time**            | Hours/days         | Minutes                     |

## 🎯 Recommended Approach

### For Your Current Project:

1. **Keep your existing NestJS setup**
2. **Add Swagger decorators** to controllers and DTOs
3. **Use Scalar for documentation** instead of building our own
4. **Focus on business logic** instead of documentation tooling

### Quick Migration:

```bash
# 1. Install Swagger
npm install @nestjs/swagger swagger-ui-express

# 2. Add Swagger to main.ts (see example above)

# 3. Add decorators to your controllers (see examples above)

# 4. Access docs at http://localhost:3000/api

# 5. Use Scalar UI for better experience
npx @scalar/cli serve --input http://localhost:3000/api-json --port 3001
```

## 🚀 Benefits of Using Scalar

1. **Professional Quality**: Industry-standard tool used by major companies
2. **Zero Maintenance**: No custom code to maintain
3. **Automatic Updates**: Always up-to-date with latest features
4. **Beautiful UI**: Modern, interactive documentation
5. **TypeScript Native**: Perfect integration with TypeScript projects
6. **OpenAPI Compliant**: Standard format, works with any tool
7. **Time Saving**: Focus on business logic, not documentation tooling

---

**Recommendation: Use Scalar instead of building our own tool. It's professional, reliable, and saves months of development time.**
