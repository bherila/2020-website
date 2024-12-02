# React Component Guidelines

## React Bootstrap Components

- Keep using `className` props on React Bootstrap components even if React 19 shows ref warnings
- React Bootstrap components handle refs internally - don't try to work around ref warnings by replacing className with style props or alternative components

## Best Practices

- Prefer React Bootstrap components over raw HTML elements for consistent styling
- Use Next.js Link for navigation except within React Bootstrap components that provide their own Link variants
