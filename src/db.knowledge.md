# Database Guidelines

## Schema Design
- Primary keys (id) are the preferred way to identify records
- Use primary key for updates/deletes instead of composite keys
- UTF8MB3 is the standard character set for text fields
- ASCII is used for technical fields (e.g. product keys)
- Use nullable fields by default unless required by business logic
- Standard varchar sizes: 100 for names/identifiers, 2000 for long text
- Add unique constraints on business-critical fields that must be unique

## Query Patterns
- Always query/update using primary key when available
