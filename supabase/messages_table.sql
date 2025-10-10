-- Create messages table for real-time chat
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read all messages
CREATE POLICY "Messages are viewable by everyone" ON messages
  FOR SELECT USING (true);

-- Allow users to insert their own messages
CREATE POLICY "Users can insert their own messages if not banned" ON messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      SELECT COALESCE(NOT is_banned, TRUE)
      FROM profiles
      WHERE id = auth.uid()
    )
  );

-- Allow users to update their own messages
CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own messages
CREATE POLICY "Users can delete their own messages" ON messages
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_messages_created_at ON messages(created_at ASC);
CREATE INDEX idx_messages_user_id ON messages(user_id);

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;