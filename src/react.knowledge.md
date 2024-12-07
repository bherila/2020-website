# React Component Guidelines

## React Bootstrap Components

- Keep using `className` props on React Bootstrap components even if React 19 shows ref warnings
- React Bootstrap components handle refs internally - don't try to work around ref warnings by replacing className with style props or alternative components
- Avoid React Bootstrap components in Server Components - they don't work with SSR
- For SSR pages, use simpler HTML elements or Next.js built-in components

## Best Practices

- Prefer React Bootstrap components over raw HTML elements for consistent styling
- Use Next.js Link for navigation except within React Bootstrap components that provide their own Link variants
- Keep forms on dedicated pages instead of inline/modal forms for better UX and accessibility
- Use simple, focused forms - one primary action per form

