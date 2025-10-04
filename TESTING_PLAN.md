# 🧪 AutoDocGen Testing Plan - Step by Step

## 🎯 Testing Scenarios

### **Step 1: Install Package**
```bash
npm install ../auto-doc-gen
```

### **Step 2: Test Basic Analysis (No Database)**
```bash
npx auto-doc-gen enhanced src --verbose
```
**Expected**: Should work, generate JSON file

### **Step 3: Test Database Without URL (Should Fail)**
```bash
npx auto-doc-gen enhanced src --database
```
**Expected**: Should show error message about missing database URL

### **Step 4: Test Database With URL (Should Work)**
```bash
npx auto-doc-gen enhanced src --database --db-url "mongodb://localhost:27017/test_db"
```
**Expected**: Should work, save to database

### **Step 5: Create Config File and Test**
```bash
# Create autodocgen.config.json with database config
npx auto-doc-gen enhanced src --database
```
**Expected**: Should work using config file

### **Step 6: Test Override Config with CLI**
```bash
npx auto-doc-gen enhanced src --database --db-url "mongodb://localhost:27017/override_db"
```
**Expected**: Should work, override config with CLI URL

### **Step 7: Test OpenAPI + Database**
```bash
npx auto-doc-gen enhanced src --database --db-url "mongodb://localhost:27017/test_db" --openapi
```
**Expected**: Should work, generate both database and OpenAPI

## 📊 Expected Results

| Test | Command | Expected Result |
|------|---------|----------------|
| 1 | Install | Package installed successfully |
| 2 | Basic analysis | ✅ JSON generated |
| 3 | Database no URL | ❌ Error message |
| 4 | Database with URL | ✅ Database saved |
| 5 | Config file | ✅ Database saved |
| 6 | Override config | ✅ Database saved |
| 7 | OpenAPI + DB | ✅ Both generated |

## 🎉 Success Criteria

- ✅ Package installs without errors
- ✅ Basic analysis works without database
- ✅ Database requires explicit URL
- ✅ Clear error messages when URL missing
- ✅ Works with config file
- ✅ CLI options override config file
- ✅ OpenAPI + Database combination works
