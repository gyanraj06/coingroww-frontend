-- Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_editor_pick BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to posts
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);

-- Policy: Allow service role (admin) full access to posts
CREATE POLICY "Allow admin full access" ON posts USING (true) WITH CHECK (true);

-- Policy: Allow public to insert into subscribers (for newsletter signup)
CREATE POLICY "Allow public insert" ON subscribers FOR INSERT WITH CHECK (true);

-- Policy: Allow admin read access to subscribers
CREATE POLICY "Allow admin read subscribers" ON subscribers FOR SELECT USING (true);
