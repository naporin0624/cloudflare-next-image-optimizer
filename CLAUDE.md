# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Workers implementation of Next.js Image optimization. It provides a drop-in replacement for Next.js image optimization using Cloudflare's image transformation APIs.

## Development Commands

- `pnpm dev` - Start development server with Wrangler
- `pnpm dev:local` - Start development server in local mode
- `pnpm build` - Build the project using tsup
- `pnpm typecheck` - Type check without emitting files
- `pnpm deploy` - Deploy to Cloudflare Workers (minified)
- `pnpm deploy:dry` - Dry run deployment
- `pnpm preview` - Preview with local HTTPS

## Architecture

The project uses:

- **Hono** as the web framework
- **Zod** for request validation
- **Cloudflare Workers** runtime with image transformation
- **TypeScript** with path aliases configured

### Key Components

- `src/index.ts` - Main application entry point, handles `/_next/image` route
- `src/handlers/transform-image.ts` - Core image transformation logic using Cloudflare's image API
- `src/middlewares/prevent-resize-loop.ts` - Prevents infinite resize loops by checking `via` header
- `src/utils/schemas.ts` - Zod schemas for image transformation parameters

### Path Aliases

The project uses TypeScript path aliases:

- `@/*` → `./src/*`
- `@middlewares/*` → `./src/middlewares/*`
- `@handlers/*` → `./src/handlers/*`
- `@utils/*` → `./src/utils/*`

## Image Transformation

The service accepts Next.js compatible image parameters:

- `width`/`w` - Image width
- `height`/`h` - Image height
- `quality`/`q` - Image quality (0-100)
- `format` - Output format (avif, webp, jpeg, png)
- `blur` - Blur amount (0-250)

Format is auto-detected from `Accept` header if not specified, preferring AVIF then WebP.

## Deployment

Configured for deployment to `ristill.club/_next/*` route. The `wrangler.toml` contains the deployment configuration.
