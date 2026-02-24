
-- 1. Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Create project_categories join table
CREATE TABLE public.project_categories (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project_categories"
  ON public.project_categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can insert project_categories"
  ON public.project_categories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project_categories"
  ON public.project_categories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project_categories"
  ON public.project_categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Trigger to limit max 3 categories per project
CREATE OR REPLACE FUNCTION public.check_max_project_categories()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.project_categories WHERE project_id = NEW.project_id) >= 3 THEN
    RAISE EXCEPTION 'A project can have at most 3 categories';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_max_3_categories
  BEFORE INSERT ON public.project_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.check_max_project_categories();

-- 4. Alter projects table: remove hero journey columns, add testimonial columns
ALTER TABLE public.projects
  DROP COLUMN challenge,
  DROP COLUMN process,
  DROP COLUMN solution,
  DROP COLUMN result,
  DROP COLUMN tags;

ALTER TABLE public.projects
  ADD COLUMN testimonial_text TEXT,
  ADD COLUMN testimonial_image TEXT,
  ADD COLUMN testimonial_audio TEXT;
