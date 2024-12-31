# React Component Guidelines

## Package Management

- Use yarn for package management, not npm
- Run `yarn add` instead of `npm install`
- Jest requires `jest-environment-jsdom` to be installed separately for tests using JSDOM

## React Bootstrap Components

- Keep using `className` props on React Bootstrap components even if React 19 shows ref warnings
- React Bootstrap components handle refs internally - don't try to work around ref warnings by replacing className with style props or alternative components
- Avoid React Bootstrap components in Server Components - they don't work with SSR
- For SSR pages, use simpler HTML elements or Next.js built-in components
- Note: Masonry is not included in react-bootstrap, use react-responsive-masonry instead

## Best Practices

- Prefer React Bootstrap components over raw HTML elements for consistent styling
- Use Next.js Link for navigation except within React Bootstrap components that provide their own Link variants
- Keep forms on dedicated pages instead of inline/modal forms for better UX and accessibility
- Use simple, focused forms - one primary action per form
- Cache and share expensive data fetching across components using global state
- Prevent duplicate API calls by sharing fetch promises between hooks

## UI Patterns

- Tables with interactive features should:
  - Use shared components for consistency
  - Support column sorting with visual indicators
  - Include real-time filtering when needed
  - Keep filter UI in table header
  - Extract reusable filter/sort components to lib/
  - Follow TransactionsTable.tsx as reference implementation

## Component Organization

- Keep reusable UI components in lib/ directory
- Prefer small, focused components with single responsibility
- Extract commonly used patterns into shared components
- Navigation should:
  - Include breadcrumbs for hierarchy
  - Use tabs for related views
  - Keep consistent placement across similar pages

