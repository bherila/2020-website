# Database Guidelines

## Schema Design
- Primary keys (id) are the preferred way to identify records
- Use primary key for updates/deletes instead of composite keys
- UTF8MB3 is the standard character set for text fields
- ASCII is used for technical fields (e.g. product keys)

## Query Patterns
- Always query/update using primary key when available
- Use prepared statements with parameterized queries
- Avoid composite key conditions unless required by business logic

## Tables
### product_keys
- Primary key: id (int, auto-increment)
- Unique constraint on product_key
- All text fields use UTF8MB3 except product_key (ASCII)
