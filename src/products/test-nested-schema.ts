// Test file to demonstrate the 5-level nested product schema
import { Product } from './products.service';

// Sample product with 5-level deep nesting
const sampleProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'A product with deep nesting',
  price: 99.99,
  category: 'Electronics',
  createdAt: new Date(),
  updatedAt: new Date(),
  deepNestedData: {
    level2: {
      level3: {
        level4: {
          level5: {
            value: 'Deep nested value at level 5',
            timestamp: new Date(),
            metadata: {
              source: 'test-system',
              version: '1.0.0',
            },
          },
        },
      },
    },
  },
};

// Function to access the deepest level
function getDeepestValue(product: Product): string {
  return product.deepNestedData.level2.level3.level4.level5.value;
}

// Function to update the deepest level
function updateDeepestValue(product: Product, newValue: string): void {
  product.deepNestedData.level2.level3.level4.level5.value = newValue;
  product.updatedAt = new Date();
}

// Test the functions
console.log('Original value:', getDeepestValue(sampleProduct));
updateDeepestValue(sampleProduct, 'Updated deep value');
console.log('Updated value:', getDeepestValue(sampleProduct));

export { getDeepestValue, sampleProduct, updateDeepestValue };

