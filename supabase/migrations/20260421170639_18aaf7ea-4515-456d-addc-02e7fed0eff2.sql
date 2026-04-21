-- Add entity_type enum and followers count to trust_items
CREATE TYPE public.trust_entity_type AS ENUM ('agence', 'client', 'entreprise');

ALTER TABLE public.trust_items
  ADD COLUMN entity_type public.trust_entity_type,
  ADD COLUMN followers integer;