## Best Practices
- Use 'server-only' import for server components
- Handle loading and error states explicitly
- Prefer static paths when possible
- Prefer server components with getSession over client components with useSession hook

## Performance Optimization
- Cache API responses aggressively with s-maxage and stale-while-revalidate
- Use client-side caching for semi-static data like session info

## Data Serialization
- Only pass plain objects between server and client components
- Explicitly serialize complex objects to plain JSON-compatible objects
- Avoid passing class instances or objects with null prototypes
- Use interface types rather than classes for shared data structures
