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
- Dynamic color classes must be added to safelist in tailwind.config.ts
- Default Tailwind colors must be spread from modernColors (excluding deprecated colors)
- Required plugins:
  - @tailwindcss/typography for prose styling
  - tailwindcss-animate for animations

### Theme Management

- Use next-themes for theme management
- ThemeProvider should wrap the app in layout.tsx
- Themes supported: light/dark/system
- Access theme state with useTheme() hook from next-themes

## Accessibility Requirements

- All pages must have proper heading hierarchy (h1 > h2 > h3)
- ARIA labels required for navigation elements
- Link text must be descriptive (avoid "click here")
- Color contrast ratios must meet WCAG AA standards
- Form inputs must have associated labels
- Interactive elements must be keyboard-navigable

## React Bootstrap Components

- Avoid and replace with shadcn components
- Keep using `className` props on React Bootstrap components even if React 19 shows ref warnings
- Use shadcn Button component as base for all buttons

## Form Validation Best Practices

### Zod Form Validation Patterns
- Use Zod schemas for form validation
- Provide default values for optional fields
- Example validation pattern:
```ts
const formSchema = z.object({
  fieldName: z.string().min(1, 'Error message'),
  optionalField: z.string().optional().default('defaultValue')
})
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    fieldName: '',
    optionalField: 'defaultValue'
  }
})
```

- For server actions, use `.default()` in Zod schema to provide fallback values
- Always handle potential parsing errors with `.safeParse()`
- Provide clear, user-friendly error messages

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

- Maintenance pages should support:
  - Renaming resources
  - Changing resource status (e.g., closed/active)
  - Providing optional metadata like closure dates
- Use checkboxes for boolean status changes
- Use calendar/date pickers for optional date fields
- Provide clear save buttons when changes are pending
- Reload page or update UI state after successful save

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

## Data Management Best Practices

### Soft Deletion
- Prefer soft deletion over hard deletion for most database records
- Implement soft deletion by adding a `when_deleted` timestamp column
- Filter out soft-deleted records in queries by checking `when_deleted` is null
- Allows for potential record recovery and maintains data integrity
- Useful for maintaining referential relationships and audit trails

### Handling Soft-Deleted Records
- When recreating a soft-deleted record, consider these strategies:
  1. Reactivate the existing record by setting `when_deleted` to null
  2. Update the record with new information while clearing the deletion timestamp
  3. Provide clear user feedback about record reactivation
- Example pattern for tag/record reactivation:
```typescript
const existingRecord = await prisma.model.findFirst({
  where: {
    label: inputLabel,
    userId: currentUserId,
  },
})

if (existingRecord && existingRecord.when_deleted) {
  // Reactivate soft-deleted record
  await prisma.model.update({
    where: { id: existingRecord.id },
    data: {
      when_deleted: null,
      // Optionally update other fields
      updatedField: newValue,
    },
  })
}
```

## Safari-specific UI Fixes
- When encountering unexpected scrollbars in Safari, first check for `overflow-auto` on parent containers
- Remove unnecessary overflow properties that might trigger scrollbars
- Test across different browsers and screen sizes

## Modal Patterns
- Use shadcn Dialog component for modals
- Implement save/cancel buttons with clear state management
- Handle loading states with disabled buttons and loading indicators
- Provide optional callback props for flexibility
- Use server actions for data mutations in modals
