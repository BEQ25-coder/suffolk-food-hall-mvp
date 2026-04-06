# Deployment Diagnostic

## Critical blockers fixed
- Removed JSX returns from `try/catch` in `src/app/admin/page.tsx`
- Escaped unescaped apostrophe in `src/components/HeroBanner.tsx`
- Aligned ESLint config with Next 15 by changing `eslint-config-next` to `15.3.1`
- Switched lint script from `next lint` to `eslint .`
- Updated flat config import to `eslint-config-next/core-web-vitals.js`

## Remaining platform note
This app stores bookings and products in JSON files. That works locally. On Vercel, writable filesystem persistence is not durable across deployments or serverless invocations.

## Recommended local validation
```bash
npm install
npm run lint
npm run build
```
