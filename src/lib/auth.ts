// src/lib/auth.ts
import { betterAuth } from 'better-auth';
import { admin, apiKey } from 'better-auth/plugins';
import { createAccessControl } from 'better-auth/plugins/access';
import * as path from 'path';
import * as fs from 'fs';

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const autodocDir = path.join(process.cwd(), 'autodoc');
const dbFile = path.join(autodocDir, 'auth.sqlite');

if (!fs.existsSync(autodocDir)) {
  fs.mkdirSync(autodocDir, { recursive: true });
}
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

const client = new MongoClient(mongoUri);
const db = client.db();


export const auth = betterAuth({
  database:mongodbAdapter(db,{client}),
  plugins: [
     admin({
      defaultRole: 'user',  
      adminRoles: ['admin'],    
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'default-secret-change-in-production',
});