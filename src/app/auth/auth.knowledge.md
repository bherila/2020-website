# Authentication Guidelines

## Password Reset Flow
- Use Office 365 SMTP for sending emails
- Reset URLs follow pattern: `/my-account/reset-password/?key=[token]`
- Token requirements:
  - Random, cryptographically secure
  - Store in users table with expiry timestamp
  - Valid for 5 minutes
  - One reset request per 5 minutes per user

## Security Guidelines
- Don't reveal if email exists during password reset
- Validate all tokens server-side
- Use environment variables for SMTP credentials
- Store timestamps in UTC

## Database Management
- Schema changes are handled manually by admin
- Required fields for password reset:
  - reset_token: varchar(100)
  - reset_token_expires: datetime
