# Next.js 15 Guidelines

## Route Parameters
- All page component params come as Promise objects in Next.js 15
- Must await params before use: `(await params).paramName`
- This applies to all dynamic route segments (e.g. [id], [slug])

## Component Organization
- Keep client/server component split clear with 'use client' directive
- Server components should focus on data fetching and prop passing
- Move interactive UI elements to client components

## Best Practices
- Use 'server-only' import for server components
- Handle loading and error states explicitly
- Prefer static paths when possible
