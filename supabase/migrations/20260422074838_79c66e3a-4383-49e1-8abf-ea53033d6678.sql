-- Add logo_url column to trust_items
ALTER TABLE public.trust_items ADD COLUMN IF NOT EXISTS logo_url text;

-- Create public storage bucket for brand assets (logos and avatars)
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public can view brand assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-assets');

-- Admins can manage
CREATE POLICY "Admins can upload brand assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'brand-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update brand assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'brand-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete brand assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'brand-assets' AND has_role(auth.uid(), 'admin'::app_role));