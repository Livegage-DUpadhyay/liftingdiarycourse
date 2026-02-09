# Data Fetching Rules

## Server Components ONLY

ALL data fetching in this application MUST be done via **Server Components**. No exceptions.

**Prohibited approaches:**
- Do NOT fetch data in Client Components (`"use client"`)
- Do NOT create or use Route Handlers (`route.ts`) for data fetching
- Do NOT use `fetch()` calls from the client side
- Do NOT use React Query, SWR, or any client-side data fetching libraries

**Required approach:**
- Fetch data directly in Server Components using async/await
- Pass fetched data down to Client Components as props when interactivity is needed

## Database Queries via `/data` Helper Functions

All database queries MUST be performed through helper functions located in the `src/data/` directory.

- Every query function lives in `src/data/` (e.g., `src/data/workouts.ts`, `src/data/exercises.ts`)
- These helper functions are the ONLY place where database access occurs
- Server Components call these helpers — they do NOT query the database directly

## Drizzle ORM Only — No Raw SQL

All database queries MUST use **Drizzle ORM**. Do NOT write raw SQL queries anywhere in the codebase.

- Use Drizzle's query builder or relational query API
- Never use `sql.raw()`, `db.execute()` with raw strings, or any other raw SQL mechanism

## User Data Isolation — CRITICAL

Logged-in users MUST only be able to access **their own data**. This is a non-negotiable security requirement.

- Every query in `src/data/` MUST filter by the authenticated user's ID
- Never expose endpoints or queries that return another user's data
- Always verify ownership before returning, updating, or deleting any record
- Treat any query missing a user ID filter as a security bug
