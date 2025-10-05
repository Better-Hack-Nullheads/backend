# How to Install AutoDocGen Package

## Simple Steps

### 1. Install the Package

```bash
npm install @auto-doc-gen/universal
```

### 2. Generate Configuration Files

```bash
npm run docs:setup
```

### 3. Or Use NPX (No Installation)

```bash
npx auto-doc-gen-universal generate . --save-to-db
```

### 4. Set Environment Variables

```bash
AUTODOCGEN_DB_ENABLED=true
AUTODOCGEN_DB_URL=mongodb://localhost:27017/autoDocDb
AUTODOCGEN_DB_NAME=autoDocDb
GOOGLE_AI_API_KEY=your_key_here
```

### 5. Generate Documentation

```bash
npx auto-doc-gen-universal generate . --save-to-db
```

## That's It!

The package will analyze your project and save documentation to the database.

## Commands Summary

```bash
# Install (optional)
npm install @auto-doc-gen/universal

# Generate config files
npm run docs:setup

# Generate docs (works without install)
npx auto-doc-gen-universal generate . --save-to-db
```
