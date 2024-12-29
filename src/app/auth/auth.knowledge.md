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

## Session Management

### Authentication Checks
- Use `requireSession()` from server_lib for route protection
- Pass return URL as parameter to enable post-login redirect
- Returns session object if authenticated
- Automatically redirects to sign-in page if not authenticated
- Invalid/corrupted session cookies return default { uid: 0 } session
- Session encryption uses jose JWT with A256GCM
- Session cookies are HTTP-only, secure, and SameSite=lax
- 30 day expiry on session cookies
- Fail silently on decryption errors to avoid exposing internals
- Clear localStorage session cache on sign-in/out
- Return HTML with script tag to clear cache before redirect
- Sign-out flow:
  1. Clear session cookie with immediate expiry
  2. Clear localStorage cache
  3. Redirect to sign-out page
  4. Never check session status on sign-out page

## Database Management
- Schema changes are handled manually by admin
- Required fields for password reset:
  - reset_token: varchar(100)
  - reset_token_expires: datetime
