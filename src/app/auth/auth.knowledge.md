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

## Authentication Patterns
- Share core authentication logic between similar flows
- Password hashing uses SHA2 with random salt
- Session management:
  - Save user session after successful auth
  - Redirect to target page after login
- Common auth flows:
  - Sign in
  - Password reset
  - Password change
  - Sign up

## Architecture
- System designed to support multiple auth methods
- Auth validation logic separated from delivery mechanism
- New auth methods can be added by:
  - Implementing method-specific validation
  - Using shared session management
  - Following existing auth flow patterns
- Passkey support:
  - WebAuthn for passwordless authentication
  - Store credentials in users table
  - Challenge-response verification
  - Can coexist with password auth
  - Security requirements:
    - Store challenges with 5-minute expiry
    - Clean up expired challenges regularly
    - Delete challenge after successful verification
    - Verify challenge belongs to correct user for registration
    - Security requirements:
      - Store challenges with 5-minute expiry
      - Clean up expired challenges regularly
      - Delete challenge after successful verification
      - Verify challenge belongs to correct user for registration
    - Security requirements:
      - Store challenges with 5-minute expiry
      - Clean up expired challenges regularly
      - Delete challenge after successful verification
      - Verify challenge belongs to correct user for registration
  - Security requirements:
    - Store challenges with 5-minute expiry
    - Clean up expired challenges regularly
    - Delete challenge after successful verification
    - Verify challenge belongs to correct user for registration
  - Security requirements:
    - Store challenges with 5-minute expiry
    - Clean up expired challenges regularly
    - Delete challenge after successful verification
    - Verify challenge belongs to correct user for registration
- Passkey support:
  - WebAuthn for passwordless authentication
  - Store credentials in users table
  - Challenge-response verification
  - Can coexist with password auth
