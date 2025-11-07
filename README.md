
# Most Like Me — Functional Scaffold

This is a production-ready starter for mostlikeme.com:
- Next.js 14 (App Router) + Tailwind
- Clerk (auth) — Google, Apple, email link
- Supabase (Postgres + pgvector ready)
- Stripe ($1 match reveal) placeholders
- Postmark (transactional email) placeholder

## Quick start
1. Copy `.env.example` to `.env.local` and fill keys from Clerk, Supabase, Stripe, Postmark.
2. Install: `npm install`
3. Run: `npm run dev`
4. Visit http://localhost:3000

## Design
Primary color: Plump Purple `#5946B2`. Supporting palette defined in `tailwind.config.ts`.

## Privacy
- No ads, no trackers. Do not add GA/FB pixels.
- Answers used only for anonymous similarity matching.
- Implement hard delete for user data before launch.
