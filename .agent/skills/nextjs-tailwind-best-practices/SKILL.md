---
name: nextjs-tailwind-best-practices
description: Best practices for Next.js App Router, TypeScript, Tailwind CSS, Zod schema validation, and secure Server Actions.
---

# Next.js & Tailwind CSS Best Practices

## Architecture & Server/Client Boundary
1. **Server Components by Default**: Keep pages and static content as Server Components (`async` where necessary) to eliminate client bundle overhead.
2. **Client Components with Purpose**: Mark interactive islands with `'use client'` only where state, browser APIs, or Motion hooks are strictly needed.
3. **Data Validation with Zod**:
   - Define strict schemas for all inputs (reservations, newsletter subscriptions, admin login).
   - Sanitize and format data before saving or sending emails.

## Tailwind CSS Conventions
- Centralize custom design tokens in `tailwind.config.ts` or CSS variables (`--color-gold`, `--color-earth-dark`, etc.).
- Avoid arbitrary, unreadable magic strings (`w-[347px]`); rely on semantic responsive utilities (`sm:`, `md:`, `lg:`, `xl:`).
- Pair `clsx` and `tailwind-merge` (via `cn()` utility) to handle conditional class concatenation safely.

## Assets & Images
- Always use `next/image` with explicit `width`, `height`, or `fill` with `sizes` to eliminate layout shift (CLS = 0).
- Provide descriptive, context-rich Spanish `alt` tags on all editorial imagery.
