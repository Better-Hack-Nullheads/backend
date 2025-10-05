import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { organization, apiKey } from 'better-auth/plugins';
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


const statement = {
  endpoints: ['read', 'write', 'delete'],  
} as const;

const ac = createAccessControl(statement);

const owner = ac.newRole({
  endpoints: ['read', 'write', 'delete'],  
});

const admin = ac.newRole({
  endpoints: ['read', 'write', 'delete'], 
});

const member = ac.newRole({
  endpoints: ['read'],  
});

export const auth = betterAuth({
  database:mongodbAdapter(db,{client}),
  plugins: [
    organization({
      ac,
      roles: {
        owner,
        admin,
        member,
      },
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.API_BASE_URL}/autodoc/accept-invite?id=${data.id}`;
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 INVITATION EMAIL');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`To: ${data.email}`);
        console.log(`From: ${data.inviter.user.name} (${data.inviter.user.email})`);
        console.log(`Organization: ${data.organization.name}`);
        console.log(`Role: ${data.role}`);
        console.log(`\nInvite Link: ${inviteLink}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      },
    }),
    apiKey({
      enableMetadata: true,
      apiKeyHeaders: ['x-api-key', 'authorization'],
      defaultPrefix: 'autodoc_',
    })
  ],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'default-secret-change-in-production',
});

export { ac, owner, admin, member };