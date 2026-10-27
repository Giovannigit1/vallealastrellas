---
name: vercel-deployment
description: Practical workflows for deploying Next.js applications seamlessly to Vercel via CLI, managing environment variables, and pre-deploy verification.
---

# Vercel Deployment Workflow

## Deployment Protocol
1. **Pre-flight Local Verification**:
   - Run `npm run build` locally to detect TypeScript or lint issues before deployment.
   - Verify that all environment variables have sensible fallbacks so that missing external services don't abort builds.
2. **Vercel CLI Execution**:
   - Check if logged in with `npx vercel whoami`.
   - Initial linking: `npx vercel --yes`.
   - Production deployment: `npx vercel --prod --yes`.
   - In case credentials or tokens are needed, pause and request them clearly with straightforward instructions.
3. **Environment Secrets Management**:
   - Never commit `.env.local` to git.
   - Include `.env.example` documenting all configuration keys (`NOTIFY_EMAIL`, `RESEND_API_KEY`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, etc.).
   - Set environment variables in Vercel project settings via CLI (`npx vercel env add ...`) or Web Dashboard.
