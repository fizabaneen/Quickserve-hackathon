-- ====================================================================
-- QuickServe Supabase Production Schema & Seed Data Script
-- ====================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'provider')),
  location VARCHAR(255) DEFAULT 'Downtown',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROVIDERS TABLE
CREATE TABLE IF NOT EXISTS public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  service VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  rating DECIMAL(3,2) DEFAULT 5.00 CHECK (rating >= 1.0 AND rating <= 5.0),
  reviews_count INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  availability VARCHAR(100) DEFAULT 'Available Today',
  initials VARCHAR(10) NOT NULL,
  color VARCHAR(20) DEFAULT '#e0f2fe',
  accent VARCHAR(20) DEFAULT '#0284c7',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  provider_name VARCHAR(255) NOT NULL,
  service VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Read Policies
CREATE POLICY "Public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read access to providers" ON public.providers FOR SELECT USING (true);
CREATE POLICY "Public read access to bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public read access to reviews" ON public.reviews FOR SELECT USING (true);

-- Insert & Update Policies
CREATE POLICY "Public insert access to profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access to bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Public insert access to reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- DEMO PROVIDERS SEED DATA
INSERT INTO public.providers (id, name, service, location, experience, price, rating, reviews_count, description, availability, initials, color, accent)
VALUES 
  ('10000000-0000-0000-0000-000000000001', 'Ahmed Electrician', 'Electrician', 'Downtown', '12 yrs', 85.00, 4.9, 128, 'Licensed electrician providing high quality residential & commercial wiring, panel upgrades, and emergency electrical fixes.', 'Available Today', 'AE', '#d7f5e9', '#0b8f68'),
  ('10000000-0000-0000-0000-000000000002', 'Ali Plumbing Services', 'Plumber', 'Northside', '8 yrs', 72.00, 4.8, 94, 'Expert plumbing solutions for clogged drains, pipe leaks, water heater repair, and bathroom fixture installation.', 'Same Day Service', 'AP', '#e3edff', '#3973d5'),
  ('10000000-0000-0000-0000-000000000003', 'Sara Cleaning Services', 'Cleaner', 'West End', '6 yrs', 45.00, 4.7, 76, 'Deep home and commercial cleaning service using eco-friendly non-toxic products with customizable schedules.', 'Available Tomorrow', 'SC', '#fff1d6', '#d88a17'),
  ('10000000-0000-0000-0000-000000000004', 'Hassan AC Services', 'AC Technician', 'Lakeside', '9 yrs', 68.00, 4.8, 88, 'Specialized in central AC repair, HVAC gas refilling, duct cleaning, and seasonal maintenance.', 'Available Today', 'HA', '#dff3f5', '#2697a2'),
  ('10000000-0000-0000-0000-000000000005', 'Ayesha Painting Services', 'Painter', 'East Village', '10 yrs', 65.00, 4.9, 104, 'Interior and exterior painting, wall texture finishes, wallpapering, and wood staining with clean estimates.', 'Available Next Day', 'AP', '#f7e1df', '#ca5d55'),
  ('10000000-0000-0000-0000-000000000006', 'Bilal Computer Repair', 'Computer Repair', 'South Market', '7 yrs', 55.00, 4.9, 112, 'Fast diagnostic and hardware repair for laptops, PCs, virus removal, network setup, and SSD upgrades.', 'Available Today', 'BC', '#e9e1ff', '#7655c9')
ON CONFLICT (id) DO NOTHING;
