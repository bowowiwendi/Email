-- Email Manager Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create saved_emails table
CREATE TABLE IF NOT EXISTS saved_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(128) NOT NULL,
  domain VARCHAR(128) NOT NULL,
  note TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_saved_emails_email ON saved_emails(email);
CREATE INDEX IF NOT EXISTS idx_saved_emails_created_at ON saved_emails(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE saved_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for public access)
-- For production, you might want to add authentication
CREATE POLICY "Allow all operations on saved_emails"
  ON saved_emails
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_saved_emails_updated_at
  BEFORE UPDATE ON saved_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
