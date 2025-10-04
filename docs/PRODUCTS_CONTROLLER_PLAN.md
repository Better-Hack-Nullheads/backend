# Products Controller Plan

## Overview
Simple CRUD controller for products with 4 basic operations.

## Controller Structure

### Product Entity
```typescript
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  createdAt: Date
  updatedAt: Date
}
```

### CRUD Operations

1. **CREATE** - `POST /products`
   - Create new product
   - Input: Product data (name, description, price, category)
   - Output: Created product with ID

2. **READ** - `GET /products`
   - Get all products
   - Output: Array of products

3. **UPDATE** - `PUT /products/:id`
   - Update existing product
   - Input: Product ID + updated data
   - Output: Updated product

4. **DELETE** - `DELETE /products/:id`
   - Delete product
   - Input: Product ID
   - Output: Success message

## File Structure
```
src/
├── products/
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   └── dto/
│       ├── create-product.dto.ts
│       └── update-product.dto.ts
```

## Implementation Plan
1. Create DTOs for request validation
2. Create ProductsService with CRUD methods
3. Create ProductsController with 4 endpoints
4. Create ProductsModule
5. Add to main AppModule

That's it - simple and clean!
