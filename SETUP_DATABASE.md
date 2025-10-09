# Database Setup Guide

This guide will help you set up the required database tables and storage for the user profile features (nickname and avatar).

To make the profile features work properly, you need to create the `profiles` table and set up avatar storage in your Supabase database.

## Steps

### 1. Set up the Profiles Table

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your project
3. Go to the SQL Editor
4. Execute the following SQL script:

```sql
-- Copy the content from supabase/profiles_table.sql file
```

Or you can copy and paste the content from the `supabase/profiles_table.sql` file directly.

### 2. Set up Avatar Storage

1. In the same SQL Editor, execute the avatar storage setup:

```sql
-- Copy the content from supabase/avatars_storage.sql file
```

Or you can copy and paste the content from the `supabase/avatars_storage.sql` file directly.

## Executing the SQL

1. Copy the SQL content from `supabase/profiles_table.sql`
2. Paste it into the SQL Editor in your Supabase dashboard
3. Click "Run" to execute the script
4. Copy the SQL content from `supabase/avatars_storage.sql`
5. Paste it into the SQL Editor and run it as well

## Verification

After running both scripts, you should see:
- A new `profiles` table in your database with `nickname` and `avatar_url` fields
- Row Level Security (RLS) enabled on the table
- Appropriate policies for reading and writing profiles
- An `avatars` storage bucket in the Storage section
- Storage policies allowing users to upload/manage their own avatars

The profile features (nickname and avatar) should now work properly!