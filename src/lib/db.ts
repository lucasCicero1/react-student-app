import { drizzle } from "drizzle-orm/postgres-js";
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);

const db = drizzle(client);

export async function getUser(email: string) {
  const usersTable = await ensureTableExists();

  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const usersTable = await ensureTableExists();
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return await db.insert(usersTable).values({ name, email, password: hash });
}

export async function activeUser(email: string) {
  const usersTable = await ensureTableExists();

  await db
    .update(usersTable)
    .set({ active: true })
    .where(eq(usersTable.email, email));
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        email VARCHAR(64),
        password VARCHAR(64),
        active BOOLEAN NOT NULL DEFAULT false,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      );`;
  }

  const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }),
    email: varchar("email", { length: 64 }),
    active: boolean().notNull().default(false),
    password: varchar("password", { length: 64 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });

  return usersTable;
}
