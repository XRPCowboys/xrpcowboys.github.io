-- STEP 1: Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  handle text UNIQUE,
  full_name text,
  bio text,
  xrp_wallet text,
  location text,
  avatar_url text,
  joined_at timestamptz DEFAULT now(),
  is_public boolean DEFAULT true
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view all profiles"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Public profiles viewable by all"
  ON profiles FOR SELECT
  USING (is_public = true);

CREATE POLICY "Members can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Members can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- STEP 2: Create member photos table
CREATE TABLE member_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  photo_url text NOT NULL,
  caption text,
  shared_to_corral boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE member_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view all photos"
  ON member_photos FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Members can insert own photos"
  ON member_photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Members can update own photos"
  ON member_photos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Members can delete own photos"
  ON member_photos FOR DELETE
  USING (auth.uid() = user_id);

-- STEP 3: Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, joined_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New Cowboy'),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
