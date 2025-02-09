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

## Account Types
- Accounts can be marked as debt/liability using `acct_is_debt` boolean
- Use checkbox in account creation form to set this flag
- Debt accounts represent financial liabilities like credit cards
- Default is non-debt (false) if not explicitly set
- Accounts are displayed in two groups: Assets and Liabilities
- Filtering is done server-side using `acct_is_debt` flag

## API Response Format
- Success: Return requested data directly
- Error: Return `{ error: string }` with 400 status
- POST operations return updated data set
- DELETE operations return `{ success: true }`
