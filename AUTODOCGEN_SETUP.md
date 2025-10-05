# AutoDocGen Universal Setup

This backend project uses the `@auto-doc-gen/universal` package for automatic documentation generation.

## Configuration

### 1. Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp autodocgen.env.example .env
```

Edit `.env` and add your API keys:

```bash
# Google AI (recommended)
GOOGLE_AI_API_KEY=your_google_api_key_here

# Or OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Or Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 2. Configuration File

The project includes `autodocgen.config.json` with default settings:

```json
{
  "ai": {
    "provider": "google",
    "model": "gemini-2.5-flash",
    "temperature": 0.7,
    "maxTokens": 4000
  },
  "database": {
    "enabled": true,
    "url": "mongodb://localhost:27017/api_docs",
    "database": "api_docs"
  },
  "files": {
    "outputDir": "./docs",
    "saveRawAnalysis": true,
    "saveAIDocs": true,
    "timestampFiles": true
  }
}
```

## Available Commands

### Analysis Commands

```bash
# Detect framework
npm run docs:detect

# Analyze project
npm run docs:analyze
npm run docs:analyze:fresh

# Full analysis with AI documentation
npm run docs:full
```

### AI Documentation Commands

```bash
# Generate AI documentation
npm run docs:generate
npm run docs:generate:fresh

# Generate with database storage
npm run docs:generate:db

# Generate with verbose output
npm run docs:generate:verbose
```

### Configuration Commands

```bash
# Show current configuration
npm run docs:config

# Validate configuration
npm run docs:config:validate

# Initialize new configuration
npm run docs:config:init
```

## Output Files

- **Analysis**: `docs/analysis.json` or `docs/fresh-analysis.json`
- **AI Documentation**: `docs/ai-analysis-{timestamp}.md`
- **Database**: MongoDB collections for persistent storage

## Framework Support

AutoDocGen Universal supports:

- ✅ **NestJS** (this project)
- ✅ **Express**
- ✅ **Fastify**
- ✅ **Koa**
- ✅ **Any TypeScript framework**

## AI Providers

- ✅ **Google Gemini** (recommended)
- ✅ **OpenAI GPT**
- ✅ **Anthropic Claude**

## Database Integration

- ✅ **MongoDB** storage for analysis and documentation
- ✅ **Automatic collection creation**
- ✅ **Type schema storage**

## Troubleshooting

### Missing API Key

```bash
❌ AI API key required. Set via --api-key, environment variable, or config file.
```

**Solution**: Add your API key to `.env` file:

```bash
GOOGLE_AI_API_KEY=your_key_here
```

### MongoDB Connection Issues

```bash
⚠️ MongoDB save failed: connection refused
```

**Solution**: Start MongoDB or disable database in config:

```json
{
  "database": {
    "enabled": false
  }
}
```

### Configuration Issues

```bash
npm run docs:config:validate
```

This will show any configuration errors and help you fix them.
