# Finance Module Guidelines

## Data Access Control
- All finance endpoints must validate account ownership
- Check `acct_owner` in accounts table matches session uid
- Return 400 with error message on access violation
- Never expose data from accounts user doesn't own

## Data Lifecycle
- Use soft deletion for all finance records
- Deleted records have `when_deleted` timestamp
- Access deleted records via `includeDeleted` query parameter
- Never physically delete finance records

## Data Processing
- Prefer SQL aggregations over client-side calculations
- Use database for grouping, summing, and filtering when possible
- Only fetch aggregated data needed for display
- Minimize data transfer between server and client

## API Response Format
- Success: Return requested data directly
- Error: Return `{ error: string }` with 400 status
- POST operations return updated data set
- DELETE operations return `{ success: true }`
