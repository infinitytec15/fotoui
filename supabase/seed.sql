-- Seed data for the school photo sales system

-- Insert sample schools
INSERT INTO public.users (id, name, schoolId, qrCode)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Parent 1', 'school-123', 'qr-123456'),
  ('00000000-0000-0000-0000-000000000002', 'Parent 2', 'school-123', 'qr-234567'),
  ('00000000-0000-0000-0000-000000000003', 'Parent 3', 'school-456', 'qr-345678');

-- Insert sample events
INSERT INTO public.events (id, name, date, schoolId)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'School Sports Day', '2023-05-15', 'school-123'),
  ('00000000-0000-0000-0000-000000000002', 'Graduation Ceremony', '2023-06-10', 'school-123'),
  ('00000000-0000-0000-0000-000000000003', 'Science Fair', '2023-04-22', 'school-123'),
  ('00000000-0000-0000-0000-000000000004', 'Art Exhibition', '2023-03-18', 'school-123'),
  ('00000000-0000-0000-0000-000000000005', 'School Play', '2023-02-05', 'school-123'),
  ('00000000-0000-0000-0000-000000000006', 'Field Trip', '2023-01-20', 'school-123');

-- Insert sample products
INSERT INTO public.products (id, name, description, price, imageUrl)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Photo Print (8x10)', 'High-quality photo print on premium paper', 19.99, 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=800&q=80'),
  ('00000000-0000-0000-0000-000000000002', 'Photo Mug', 'Ceramic mug with your favorite photo', 24.99, 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&q=80'),
  ('00000000-0000-0000-0000-000000000003', 'Photo Calendar', 'Personalized 12-month calendar', 29.99, 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80'),
  ('00000000-0000-0000-0000-000000000004', 'Photo Frame', 'Elegant wooden frame for your photo', 34.99, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'),
  ('00000000-0000-0000-0000-000000000005', 'Photo Keychain', 'Carry your memories with you', 14.99, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80'),
  ('00000000-0000-0000-0000-000000000006', 'Photo T-Shirt', 'Custom printed t-shirt with your photo', 39.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80');
