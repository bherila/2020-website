## Best Practices
- Use 'server-only' import for server components
- Handle loading and error states explicitly
- Prefer static paths when possible

## Performance Optimization
- Cache API responses aggressively with s-maxage and stale-while-revalidate
- Run middleware only on routes that need it
- Use client-side caching for semi-static data like session info
- Enable webpack optimizations:
  - Use module concatenation (concatenateModules: true)
  - Enable tree shaking in all environments (usedExports: true)
- Minify critical scripts and inline them in <head>
- Use @next/bundle-analyzer to monitor bundle sizes
```
