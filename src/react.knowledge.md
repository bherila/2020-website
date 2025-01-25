# React Component Guidelines

## Package Management

- Use yarn for package management, not npm
- Run `yarn add` instead of `npm install`
- Run `npx shadcn` to install shadcn components, do not run `npx shadcn-ui`
- Jest requires `jest-environment-jsdom` to be installed separately for tests using JSDOM

## Styling Guidelines

### Tailwind CSS
- Default font: Sans-serif stack with system UI fonts and emoji support
- Use Tailwind utility classes for styling
- Spacing scale matches Bootstrap (1 = 0.25rem)
- Color names match Bootstrap: primary, secondary, success, danger, warning, info, light, dark
- Required plugins:
  - @tailwindcss/typography for prose styling
  - tailwindcss-animate for animations

### Theme Management

- Use next-themes for theme management
- ThemeProvider should wrap the app in layout.tsx
- Themes supported: light/dark/system
- Access theme state with useTheme() hook from next-themes

## React Bootstrap Components

- Avoid and replace with shadcn components
- Keep using `className` props on React Bootstrap components even if React 19 shows ref warnings
- Use shadcn Button component as base for all buttons

## Best Practices

- Use react-hook-form with zod for form validation and type safety
- Example validation pattern:
```ts
const formSchema = z.object({
  fieldName: z.string().min(1, 'Error message')
})
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    fieldName: ''
  }
})
```
- Prefer shadcn components over raw HTML elements for consistent styling
- Keep forms on dedicated pages instead of inline/modal forms for better UX and accessibility
- Use simple, focused forms - one primary action per form
- Cache and share expensive data fetching across components using global state
- Prevent duplicate API calls by sharing fetch promises between hooks
- Use react-hook-form and zod for form validation

## UI Patterns

- Tables with interactive features should:
  - Use shared components for consistency
  - Support column sorting with visual indicators
  - Include real-time filtering when needed
  - Keep filter UI in table header
  - Extract reusable filter/sort components to lib/
  - Follow TransactionsTable.tsx as reference implementation

## Deprecated

- Removed custom ThemeProvider component in favor of next-themes

## Component Organization

- Keep reusable UI components in lib/ directory
- Prefer small, focused components with single responsibility
- Extract commonly used patterns into shared components
- Navigation should:
  - Include breadcrumbs for hierarchy
  - Use tabs for related views
  - Keep consistent placement across similar pages

