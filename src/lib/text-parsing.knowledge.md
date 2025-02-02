# Text Parsing Guidelines

## Delimited Text Handling

- Check for delimiters only outside quoted sections when auto-detecting
- Trim whitespace from column values
- Handle escaped characters before delimiter detection
- Preserve newlines in quoted sections with proper indentation
- Support CSV, TSV, and pipe-separated formats
- Return empty array for empty input
