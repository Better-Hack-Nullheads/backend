# How to Generate Documentation

## Simple Steps

### 1. Set Environment Variables

```bash
AUTODOCGEN_DB_ENABLED=true
AUTODOCGEN_DB_URL=mongodb://localhost:27017/autoDocDb
AUTODOCGEN_DB_NAME=autoDocDb
GOOGLE_AI_API_KEY=your_key_here
```

### 2. Run the Generate Command

```bash
npx auto-doc-gen-universal generate . --save-to-db
```

### 3. Check the Results

```bash
# Get document count
curl http://localhost:3000/documents/count

# Get all chunk times
curl http://localhost:3000/documents/chunk-times

# Get documents for a specific chunk
curl http://localhost:3000/documents/chunk/2024-01-01T10:30:00.000Z
```

## That's It!

The package will:

- Analyze your project
- Generate AI documentation
- Save everything to the database
- Your backend can then serve the documents via API

## Commands Summary

```bash
# Generate docs
npx auto-doc-gen-universal generate . --save-to-db

# Test endpoints
curl http://localhost:3000/documents/count
curl http://localhost:3000/documents/chunk-times
```
