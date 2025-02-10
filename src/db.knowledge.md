# Database Guidelines

## Prisma Guidelines
- Prisma is already installed and configured
- Auto generated Prisma types for server-side, are in @/server_lib/prisma.ts, these should not be imported from Client components.
- Auto generated Prisma zod types, are in @/lib/prisma-generated-zod.
- Also refer to schema.prisma for Prisma model definitions.

## Environment Variable Loading
- When running Prisma commands, always load environment variables from .env.local first
- Use this command to ensure proper environment configuration:
  ```bash
  dotenv -e .env.local -- yarn prisma generate
  ```
- This ensures that database connection strings and other sensitive configurations are correctly loaded

## Schema Design
- Primary keys (id) are the preferred way to identify records
- UTF8MB4 should be the standard character set for text fields

## Query Patterns
- Always query/update using primary key when available
- Prefer direct Prisma queries in API routes over helper functions
- Use soft deletes by setting when_deleted timestamp instead of removing records

## Schema Validation
- Use zod-prisma-types generator to create Zod schemas from Prisma models
- Generate types with `yarn prisma generate`
- Import schemas from `@/prisma/generated/zod`

## Foreign Key Constraints
- Always specify `onDelete` and `onUpdate` behaviors for foreign key relations
- Use `Cascade` when child records should be deleted/updated with parent
- Helps maintain referential integrity
- Prevents foreign key constraint errors during schema migrations
