# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lifting Diary - a Next.js 16 fitness/workout tracking application (greenfield project bootstrapped with create-next-app).

## Commands

- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19** with Server Components as default
- **TypeScript 5** (strict mode, path alias `@/*` → `./src/*`)
- **Tailwind CSS v4** (new architecture via `@tailwindcss/postcss`, NOT v3 — uses `@import "tailwindcss"` and `@theme inline` in CSS instead of tailwind.config.js)
- **ESLint 9** with flat config format (`eslint.config.mjs`)
- **Geist fonts** (Sans and Mono) via `next/font/google`

## Architecture

- All source code lives in `src/app/` using file-based routing
- `src/app/layout.tsx` - Root layout with font setup and metadata
- `src/app/globals.css` - Global styles with Tailwind v4 imports and CSS variable theming
- Dark mode uses `prefers-color-scheme` media query with CSS variables (`--background`, `--foreground`)
- Static assets in `public/`

## Documentation-First Rule

**IMPORTANT:** Before generating or modifying any code, ALWAYS read and refer to the relevant documentation files in the `docs/` directory first. These docs contain project-specific decisions, patterns, and requirements that MUST be followed. If a docs file covers the area you are working on, treat it as the source of truth.

Current docs:
- `docs/ui.md` — UI guidelines and component patterns
- `docs/data-fetching.md` — Data fetching rules and database access patterns

## Key Conventions

- Tailwind v4: theme customization goes in `globals.css` using `@theme inline` blocks, not a separate config file
- Next.js config is TypeScript (`next.config.ts`)
- Components in App Router are Server Components by default; add `"use client"` directive for client components
