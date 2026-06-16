# CLAUDE.md

Guidance for working in this repository.

## Overview

Multi-locale (en-US, bn-BD — default `bn-BD`) dentist marketing/booking website built with
**Payload CMS 3.81** + **Next.js 15.5 (App Router)** + **React 19** on **MongoDB**. Media is
stored in Cloudflare R2 (S3-compatible). Content editors build pages from reusable Payload blocks
via the admin UI.

## Commands

Package manager is **npm** (`.npmrc` sets `legacy-peer-deps=true`). Requires Node `^18.20.2` or
`>=20.9.0`.

- `npm run dev` — start the dev server
- `npm run devsafe` — clean `.next` then start dev (use when the dev server misbehaves)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint
- `npm run generate:types` — regenerate `src/payload-types.ts` (**run after any collection /
  global / field change**)
- `npm run generate:importmap` — regenerate the Payload admin import map
- `npm run payload` — Payload CLI

> There is **no test framework** configured in this repo.

> `next.config.mjs` is set to **ignore TypeScript and ESLint errors during build**, so the build
> will not catch them. Run `npm run lint` (and `npm run generate:types`) manually.

## Architecture

- **`src/payload.config.ts`** — Payload entrypoint. MongoDB via `mongooseAdapter` (`DATABASE_URI`),
  S3/R2 storage attached to the `media` collection, plugins: SEO, S3 storage, Payload Cloud, plus
  a custom SEO URL generator in `src/plugins/seo/`. Localization `en-US`/`bn-BD` with fallback.
  Rich text uses Lexical.
- **Collections** (`src/collections/`): `Users`, `Media`, `Pages`, `Treatments`, `Reviews`,
  `Appointment`, `Doctors`, `Popup`.
- **Globals** (`src/globals/`): `Header`, `Footer`, `Contacts`, `Socials`.
- **App Router** (`src/app/`) uses two route groups:
  - `(payload)` — admin (`/admin/[[...segments]]`) + REST/GraphQL API.
  - `(frontend)` — public site under `/[locale]/` (home, `treatments`, `treatments/[slug]`,
    `about`, `appointments`, `book-appointment`, sitemaps) plus draft preview routes.
- **i18n** via `next-intl`: `src/middleware.ts` + `src/i18n/` (routing + navigation wrappers).
  `next.config.mjs` wraps the app with `withPayload()` and `withNextIntl()`; `output: 'standalone'`.
- **Content building**: Payload blocks in `src/blocks/`, reusable field configs in `src/fields/`
  (SEO, slug, button, color, status), access helpers in `src/access/` (`isAdmin`,
  `isAdminOrSelf`), and data-fetching / SEO / ISR-revalidation utilities in `src/utilities/`.
- **UI**: shadcn/ui + Radix + Tailwind 3.4 (config in `components.json`; custom `bn`/`en` language
  variants), `react-hook-form` + `zod`, `framer-motion`, `sonner` toasts.

## Conventions

- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`.
- Prettier: single quotes, **no semicolons**, trailing commas (`all`), print width 100.
- ESLint extends `next/core-web-vitals` + `next/typescript`.
- After changing any collection/global/field, run `npm run generate:types` to keep
  `src/payload-types.ts` in sync.

## Environment

See `.env.example`. Key vars: `DATABASE_URI`, `PAYLOAD_SECRET`,
`R2_ACCESS_TOKEN` / `R2_SECRET_TOKEN` / `R2_ENDPOINT` / `R2_BUCKET`, `BASE_URL`,
`NEXT_PUBLIC_BASE_URL`, and optional `NEXT_PUBLIC_UMAMI_*` analytics.

## Skills

This repo ships a `payload` skill (managed via `skills-lock.json`, sourced from
`payloadcms/skills`) with detailed reference docs under `.agents/skills/payload/reference/`.
It is exposed to Claude Code through a symlink at `.claude/skills/payload`. Consult it when
working with Payload config, collections, fields, hooks, access control, or queries.

## Docker

`Dockerfile` is a multi-stage build (Node 22 alpine, `output: standalone`); `docker-compose.yml`
runs the app alongside MongoDB.
