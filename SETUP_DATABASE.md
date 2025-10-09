# Database Setup Instructions

## Creating the profiles table

To make the nickname feature work properly, you need to create the `profiles` table in your Supabase database.

### Steps:

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Copy and run the following SQL code:

```sql
-- Copy the content from supabase/profiles_table.sql file
-- Or run the following code directly:

-- Create profiles table for user nicknames
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read nicknames (no PII stored)
CREATE POLICY "Profiles are readable by everyone" ON profiles
  FOR SELECT USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Optional index
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at DESC);
```

5. Click the "Run" button to execute the SQL

### Verification

After running the SQL, you should be able to:
- Set nicknames on the `/profile` page
- See nicknames instead of emails in chat
- See nicknames in the top navigation bar

If you still have issues, please check the browser console for error messages.