
CREATE TABLE public.page_visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL DEFAULT '/',
  referrer text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_visits_created_at ON public.page_visits (created_at DESC);

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page visits"
ON public.page_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view page visits"
ON public.page_visits
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page visits"
ON public.page_visits
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
