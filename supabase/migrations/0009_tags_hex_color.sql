-- Allow any text value in tags.color (including hex strings like '#FF5500')
-- The original CHECK constraint only permitted the 8 preset keys.
ALTER TABLE public.tags
  DROP CONSTRAINT IF EXISTS tags_color_check;
