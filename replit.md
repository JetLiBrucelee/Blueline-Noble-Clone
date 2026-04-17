# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Blueline Offshore (`artifacts/blueline-offshore`)
- **Type**: React + Vite web app
- **Preview path**: `/`
- **Description**: Full professional offshore services company website for "Blueline Offshore"
- **Pages**: Home, About, Services, Projects, Fleet, Careers, News, Contact, 404
- **Features**:
  - Full-screen hero with crossfading background images, animated particles, scroll reveal
  - Video modal (YouTube embed) on hero and video banner section
  - Services dropdown navigation with 6 service categories
  - Animated stats counter section
  - 3D card hover effects throughout
  - Contact form with success state
  - Global offices section with Google Maps embed
  - Animated gradient borders, glow effects, hex pattern backgrounds
  - Responsive mobile menu
  - Top bar with phone (+1 202-555-0147) and email (support@bluelineoffshore.com)
  - Dark navy color scheme with ocean blue accent (#0ea5e9)
- **Fonts**: Montserrat (display), Open Sans (body), Playfair Display (serif)
- **Contact email**: support@bluelineoffshore.com

### API Server (`artifacts/api-server`)
- **Type**: Express API
- **Preview path**: `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
