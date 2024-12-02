# React Development Guidelines

## React 19 Compatibility

### Class Names and Refs
- Do not replace className props with inline styles to fix ref warnings
- className="px-1" usage is still valid despite ref warnings
- React 19 ref warnings about "accessing element.ref" may be false positives for valid className usage

## Component Guidelines
- Prefer className over inline styles for consistent styling
- Bootstrap utility classes (e.g. px-1) are supported and encouraged
