#!/usr/bin/env node

// Simple script to demonstrate auto-doc-gen usage
const fs = require('fs');
const path = require('path');

console.log('🚀 AutoDocGen Backend Integration Demo');
console.log('=====================================\n');

// Read the existing analysis data
const analysisPath = path.join(__dirname, 'docs', 'analysis.json');
const analysisData = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

console.log('📊 Analysis Data Summary:');
console.log(`   Total Files: ${analysisData.metadata.totalFiles}`);
console.log(`   Controllers: ${analysisData.metadata.totalControllers}`);
console.log(`   Services: ${analysisData.metadata.totalServices}`);
console.log(`   Methods: ${analysisData.metadata.totalMethods}`);
console.log(`   Types: ${analysisData.metadata.totalTypes}\n`);

console.log('🎯 Controllers Found:');
analysisData.controllers.forEach((controller) => {
  console.log(`   - ${controller.name} (${controller.methods.length} methods)`);
});

console.log('\n🔧 Services Found:');
analysisData.services.forEach((service) => {
  console.log(`   - ${service.name} (${service.methods.length} methods)`);
});

console.log('\n📝 Types Found:');
analysisData.types.forEach((type) => {
  console.log(`   - ${type.name} (${type.type})`);
});

console.log('\n✅ Ready to generate AI documentation!');
console.log('\nTo use with real AI:');
console.log('1. Set your API key:');
console.log('   export GOOGLE_AI_API_KEY="your-api-key"');
console.log('   # or');
console.log('   export OPENAI_API_KEY="your-api-key"');
console.log('   # or');
console.log('   export ANTHROPIC_API_KEY="your-api-key"');
console.log('\n2. Run the command:');
console.log(
  '   node ../auto-doc-gen/dist/cli.js ai docs/analysis.json --verbose',
);
console.log('\n3. Optional: Save to database');
console.log(
  '   node ../auto-doc-gen/dist/cli.js ai docs/analysis.json --save-to-db',
);
console.log('\n4. Custom output location:');
console.log(
  '   node ../auto-doc-gen/dist/cli.js ai docs/analysis.json --output docs/my-docs.md',
);
