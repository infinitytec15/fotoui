-- Create tables for the school photo sales system

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  schoolId TEXT NOT NULL,
  qrCode TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  schoolId TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  userId UUID NOT NULL REFERENCES public.users(id),
  uploadDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  eventId UUID REFERENCES public.events(id),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  imageUrl TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId UUID NOT NULL REFERENCES public.users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  deliveryMethod TEXT NOT NULL,
  deliveryAddress JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orderId UUID NOT NULL REFERENCES public.orders(id),
  productId UUID NOT NULL REFERENCES public.products(id),
  photoId UUID NOT NULL REFERENCES public.photos(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  customizations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Create policies for events
CREATE POLICY "Events are viewable by all authenticated users" ON public.events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for photos
CREATE POLICY "Users can view their own photos" ON public.photos
  FOR SELECT USING (auth.uid() = userId);
CREATE POLICY "Users can insert their own photos" ON public.photos
  FOR INSERT WITH CHECK (auth.uid() = userId);

-- Create policies for products
CREATE POLICY "Products are viewable by all authenticated users" ON public.products
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = userId);
CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = userId);

-- Create policies for order items
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE public.orders.id = public.order_items.orderId
      AND public.orders.userId = auth.uid()
    )
  );
CREATE POLICY "Users can insert their own order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE public.orders.id = public.order_items.orderId
      AND public.orders.userId = auth.uid()
    )
  );

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Set up storage policies
CREATE POLICY "Anyone can view photos" ON storage.objects FOR SELECT
  USING (bucket_id = 'photos');

CREATE POLICY "Authenticated users can upload photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');
