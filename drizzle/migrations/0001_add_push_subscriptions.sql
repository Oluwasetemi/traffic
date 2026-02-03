-- Create push subscription table
CREATE TABLE IF NOT EXISTS "pushSubscription" (
  "id" text PRIMARY KEY NOT NULL,
  "userId" text NOT NULL,
  "endpoint" text NOT NULL UNIQUE,
  "p256dh" text NOT NULL,
  "auth" text NOT NULL,
  "expirationTime" timestamp,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "pushSubscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade
);

-- Create index on userId for faster queries
CREATE INDEX IF NOT EXISTS "pushSubscription_userId_idx" ON "pushSubscription" ("userId");

-- Create index on endpoint for faster lookups
CREATE INDEX IF NOT EXISTS "pushSubscription_endpoint_idx" ON "pushSubscription" ("endpoint");
