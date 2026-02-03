import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from './db'
import * as schema from './db/schema'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 10, // 10 requests per window
    storage: 'database', // Store rate limit data in database
  },
  plugins: [nextCookies()],
  trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'],
})

export type Session = typeof auth.$Infer.Session
