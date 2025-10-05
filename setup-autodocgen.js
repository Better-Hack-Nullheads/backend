#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AutoDocGen Universal...\n');

// 1. Create autodocgen.config.json if it doesn't exist
const configPath = './autodocgen.config.json';
if (!fs.existsSync(configPath)) {
  const defaultConfig = {
    ai: {
      provider: 'google',
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      maxTokens: 4000,
    },
    database: {
      enabled: true,
      url: 'mongodb://localhost:27017/api_docs',
      database: 'api_docs',
      collections: {
        documentation: 'documentation',
        endpoints: 'endpoints',
        types: 'types',
      },
      mapping: {
        createCollections: true,
        includeTypeSchemas: true,
      },
    },
    files: {
      outputDir: './docs',
      analysisFilename: 'analysis.json',
      docsFilename: 'ai-analysis.md',
      saveRawAnalysis: true,
      saveAIDocs: true,
      timestampFiles: true,
    },
    framework: {
      autoDetect: true,
    },
    verbose: false,
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log('✅ Created autodocgen.config.json');
} else {
  console.log('ℹ️  autodocgen.config.json already exists');
}

// 2. Create .env.example if it doesn't exist
const envExamplePath = './autodocgen.env.example';
if (!fs.existsSync(envExamplePath)) {
  const envExample = `# AutoDocGen Configuration
# Copy this file to .env and fill in your values

# AI Configuration
AUTODOCGEN_AI_PROVIDER=google
AUTODOCGEN_AI_TEMPERATURE=0.7
AUTODOCGEN_AI_MAX_TOKENS=4000

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_api_key_here
AUTODOCGEN_GOOGLE_API_KEY=your_google_api_key_here
AUTODOCGEN_GOOGLE_MODEL=gemini-2.5-flash

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
AUTODOCGEN_OPENAI_API_KEY=your_openai_api_key_here
AUTODOCGEN_OPENAI_MODEL=gpt-4o

# Anthropic Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here
AUTODOCGEN_ANTHROPIC_API_KEY=your_anthropic_api_key_here
AUTODOCGEN_ANTHROPIC_MODEL=claude-3-5-sonnet

# Database Configuration
AUTODOCGEN_DB_ENABLED=true
AUTODOCGEN_DB_URL=mongodb://localhost:27017/api_docs
AUTODOCGEN_DB_NAME=api_docs
AUTODOCGEN_DB_DOCS_COLLECTION=documentation
AUTODOCGEN_DB_ENDPOINTS_COLLECTION=endpoints
AUTODOCGEN_DB_TYPES_COLLECTION=types
AUTODOCGEN_DB_CREATE_COLLECTIONS=true
AUTODOCGEN_DB_INCLUDE_TYPES=true

# File Configuration
AUTODOCGEN_OUTPUT_DIR=./docs
AUTODOCGEN_ANALYSIS_FILENAME=analysis.json
AUTODOCGEN_DOCS_FILENAME=ai-analysis.md
AUTODOCGEN_SAVE_RAW=true
AUTODOCGEN_SAVE_AI_DOCS=true
AUTODOCGEN_TIMESTAMP_FILES=true

# Framework Configuration
AUTODOCGEN_AUTO_DETECT=true
AUTODOCGEN_FORCE_FRAMEWORK=

# General Configuration
AUTODOCGEN_VERBOSE=false`;

  fs.writeFileSync(envExamplePath, envExample);
  console.log('✅ Created autodocgen.env.example');
} else {
  console.log('ℹ️  autodocgen.env.example already exists');
}

// 3. Check if .env exists and prompt to create it
const envPath = './.env';
if (!fs.existsSync(envPath)) {
  console.log('\n⚠️  .env file not found!');
  console.log(
    '📋 Please copy autodocgen.env.example to .env and add your API keys:',
  );
  console.log('   cp autodocgen.env.example .env');
  console.log('   # Then edit .env and add your API keys');
} else {
  console.log('✅ .env file exists');
}

// 4. Update package.json scripts if they don't exist
const packageJsonPath = './package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const requiredScripts = {
    'docs:analyze':
      'npx auto-doc-gen-universal analyze . --config autodocgen.config.json --output docs/analysis.json',
    'docs:analyze:fresh':
      'npx auto-doc-gen-universal analyze . --config autodocgen.config.json --output docs/fresh-analysis.json',
    'docs:generate':
      'npx auto-doc-gen-universal ai docs/analysis.json --config autodocgen.config.json',
    'docs:generate:fresh':
      'npx auto-doc-gen-universal ai docs/fresh-analysis.json --config autodocgen.config.json',
    'docs:generate:verbose':
      'npx auto-doc-gen-universal ai docs/analysis.json --config autodocgen.config.json --verbose',
    'docs:generate:fresh:verbose':
      'npx auto-doc-gen-universal ai docs/fresh-analysis.json --config autodocgen.config.json --verbose',
    'docs:generate:db':
      'npx auto-doc-gen-universal ai docs/analysis.json --config autodocgen.config.json --save-to-db',
    'docs:full': 'npm run docs:analyze:fresh && npm run docs:generate:fresh',
    'docs:detect':
      'npx auto-doc-gen-universal detect . --config autodocgen.config.json --verbose',
    'docs:config':
      'npx auto-doc-gen-universal config show --config autodocgen.config.json',
    'docs:config:init':
      'npx auto-doc-gen-universal config init --config autodocgen.config.json',
    'docs:config:validate':
      'npx auto-doc-gen-universal config validate --config autodocgen.config.json',
  };

  let scriptsUpdated = false;
  for (const [scriptName, scriptCommand] of Object.entries(requiredScripts)) {
    if (!packageJson.scripts || !packageJson.scripts[scriptName]) {
      if (!packageJson.scripts) packageJson.scripts = {};
      packageJson.scripts[scriptName] = scriptCommand;
      scriptsUpdated = true;
    }
  }

  if (scriptsUpdated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json scripts');
  } else {
    console.log('ℹ️  package.json scripts already up to date');
  }
}

// 5. Create docs directory if it doesn't exist
const docsDir = './docs';
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
  console.log('✅ Created docs directory');
} else {
  console.log('ℹ️  docs directory already exists');
}

console.log('\n🎉 AutoDocGen Universal setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Copy autodocgen.env.example to .env');
console.log('2. Add your API keys to .env');
console.log('3. Run: npm run docs:detect');
console.log('4. Run: npm run docs:full');
console.log('\n📚 Available commands:');
console.log('   npm run docs:detect     - Detect framework');
console.log('   npm run docs:analyze    - Analyze project');
console.log('   npm run docs:generate   - Generate AI docs');
console.log('   npm run docs:full       - Full pipeline');
console.log('   npm run docs:config     - Show configuration');
