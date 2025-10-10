# Banned Users Guide

This guide explains how to ban and unban users and how the application behaves when a user is banned.

## Prerequisites
- The `profiles` table has an `is_banned BOOLEAN DEFAULT FALSE` column.
- The latest SQL is applied (see `supabase/profiles_table.sql` and `supabase/messages_table.sql`).

## How to Ban a User
- Option A: Use the Supabase SQL Editor and run:

```sql
-- Replace <USER_ID> with the user's auth.uid()
UPDATE public.profiles
SET is_banned = TRUE
WHERE id = '<USER_ID>';
```

- Option B: In Table Editor, open `profiles`, locate the user's row, set `is_banned` to `TRUE`, and save.

### Effects
- Middleware redirects banned users from protected routes to `/banned`.
- Chat input and send are disabled.
- Row Level Security (RLS) in the `messages` table prevents banned users from inserting messages.

## How to Unban a User
- Use the SQL Editor and run:

```sql
UPDATE public.profiles
SET is_banned = FALSE
WHERE id = '<USER_ID>';
```

- Or set `is_banned` to `FALSE` in Table Editor.

## Verification Steps
1. In `profiles`, set the target user's `is_banned` to TRUE.
2. Log in as that user and verify:
   - Redirect to the `/banned` page.
   - Chat input and send button are disabled.
   - Attempting to insert into `messages` fails (denied by RLS).
3. Set `is_banned` back to FALSE and verify:
   - Protected routes are accessible.
   - Chat input and send are enabled.

## Notes
- If you don't see the redirect or disabled UI, ensure the latest deployment is live.
- In local development, verify `.env` and Supabase project settings, and that the latest SQL migrations have been run.
- Admin or server-side workflows can also perform bans by executing the `UPDATE` statement above within your admin panel or API.