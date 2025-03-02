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
- Accounts can be marked as closed with an optional closure date
- Closing an account does not delete the account or its transactions
- Closed accounts can be reopened by clearing the closure date
- Closure date is stored in the `when_closed` field
- Accounts with a non-null `when_closed` are considered closed
- Closed accounts are displayed at the bottom of their respective sections
- Closed accounts are visually indicated with a "Closed" badge
- Closed accounts have reduced opacity
- Closed accounts are excluded from the balance chart
- Closed accounts remain clickable and can be viewed in detail

## Account Types
- Accounts can be categorized with multiple boolean flags:
  - `acct_is_debt`: Indicates a liability account
  - `acct_is_retirement`: Indicates a retirement account
- Accounts are displayed in three groups: Assets, Liabilities, and Retirement
- Filtering is done server-side using account type flags
- Liability accounts are displayed as negative values in charts and tables
- Retirement accounts are displayed with dashed/striped bars in charts
- Account flags can be modified directly on the account maintenance page
- Flags are updated via server action with immediate effect

## Visualization
- Stacked balance chart shows:
  - Liability accounts as negative bars with reduced opacity
  - Retirement accounts with dashed/striped bars
- Checkboxes allow toggling visibility of Liabilities and Retirement accounts
- Tooltip shows absolute value of account balances

## API Response Format
- Success: Return requested data directly
- Error: Return `{ error: string }` with 400 status
- POST operations return updated data set
- DELETE operations return `{ success: true }`
