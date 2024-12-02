# GraphQL Schema Organization

## Schema Definition Rules
- Define all schemas in graphql.ts files
- Other files should import schemas from graphql.ts
- Avoid duplicate schema/type definitions across files
- Use zod schema inference for TypeScript types instead of separate interface definitions

## Location
- Primary schema definitions belong in api/[feature]/graphql.ts
- Feature-specific types should import from the corresponding graphql.ts file
