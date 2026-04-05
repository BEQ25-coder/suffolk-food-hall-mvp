# Suffolk Food Hall Portfolio MVP

A mobile-first full-stack portfolio project for Suffolk Food Hall, built with Next.js App Router and TypeScript.

## Overview

This project presents a joined-up customer experience around:

- events discovery
- shop browsing
- loyalty presentation
- dining booking requests
- internal booking review in admin

The app is intentionally scoped as a polished portfolio MVP. It focuses on realistic product flows, clean structure, and clear future upgrade paths rather than external integrations.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons
- JSON-backed local file storage for seeded content and booking records

## Features

### Customer-facing
- home page with featured event, offers, and opening hours
- events listing with loading, empty, and error states
- shop browsing with basket preview and weighed-goods messaging
- loyalty wallet with member summary and offers
- booking request flow with field validation and submission feedback

### Admin
- booking request list
- booking status updates for pending, confirmed, and rejected
- consistent fallback states when data is unavailable

## Architecture

The project keeps a deliberately simple structure so it is easy to understand in a portfolio review.

### Frontend
- `src/app/*` contains route-level pages and route loading states
- `src/components/*` contains reusable UI components
- `src/app/globals.css` defines shared surface and typography utility classes

### Data layer
- `src/lib/demo-data.ts` contains seeded content used across the UI
- `db/*.json` stores local persisted records and seeded product data
- `src/lib/file-db.ts` handles lightweight file reads and writes
- `src/lib/bookings-store.ts` and `src/lib/products-store.ts` keep route logic separated from storage details

### API routes
- `GET /api/events`
- `GET /api/products`
- `GET /api/bookings`
- `POST /api/booking-request`
- `PATCH /api/bookings/[id]`

## Project structure

```text
src/
  app/
    api/
    admin/
    book/
    events/
    loyalty/
    shop/
  components/
  lib/
db/
public/
scripts/
```

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Notes

- this project is designed as a portfolio MVP rather than a production-integrated application
- product, events, and loyalty content is seeded locally for predictable review and testing
- booking requests are persisted locally to keep the full flow testable without external services
