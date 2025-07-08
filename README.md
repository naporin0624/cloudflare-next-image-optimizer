# Cloudflare Images

Cloudflare Workers implementation of Next.js Image optimization using Cloudflare Images.

## Overview

This project provides a cost-effective alternative to Vercel's image optimization. It implements Next.js's `/_next/image` endpoint using Cloudflare Workers and Cloudflare Images.

**Cost Comparison:**
- Vercel: $5/1000 images
- Cloudflare Images: $0.5/1000 images (10x cheaper)

## Features

- Next.js Image optimization API compatibility
- Support for width, height, format, and quality parameters
- Automatic format detection based on Accept headers
- Infinite loop prevention with via header middleware
- Type-safe parameter validation with Zod
- Blur placeholder support

## Installation

```bash
pnpm install
```

## Development

```bash
# Start development server
pnpm dev

# Start with local mode
pnpm dev:local

# Type checking
pnpm typecheck

# Build for production
pnpm build
```

## Deployment

```bash
# Deploy to Cloudflare Workers
pnpm deploy

# Dry run deployment
pnpm deploy:dry
```

## Configuration

### wrangler.toml

Configure your routes in `wrangler.toml`:

```toml
routes = [
  { pattern = "yourdomain.com/_next/*", zone_name = "yourdomain.com" }
]
```

### Environment Variables

No additional environment variables are required. The worker uses Cloudflare's built-in image optimization features.

## Usage

The worker intercepts requests to `/_next/image` and processes them using Cloudflare Images. It supports the same query parameters as Next.js:

- `url`: Source image URL
- `w`: Width
- `h`: Height (optional)
- `q`: Quality (1-100)
- `f`: Format (webp, jpeg, png, avif)

Example:
```
https://yourdomain.com/_next/image?url=https://example.com/image.jpg&w=800&q=80&f=webp
```

## Architecture

- Handler at `src/handlers/transform-image.ts` - Main image transformation logic
- Middleware at `src/middlewares/prevent-resize-loop.ts` - Prevents infinite loops
- Utilities:
  - `src/utils/format-detection.ts` - Detects optimal image format
  - `src/utils/schemas.ts` - Zod validation schemas

## Implementation Details

Based on the implementation described in [this Zenn article](https://zenn.dev/naporin24690/articles/e8b81c30861a9b), this project:

1. **Intercepts requests** to `/_next/image` using Cloudflare Workers Routes
2. **Validates parameters** using Zod schemas for type safety
3. **Prevents infinite loops** with via header middleware
4. **Optimizes images** using Cloudflare's `cf` object with dynamic format selection
5. **Supports blur placeholders** for loading states

## License

MIT