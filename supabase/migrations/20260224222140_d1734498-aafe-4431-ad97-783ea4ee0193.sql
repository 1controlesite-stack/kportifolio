
-- Drop all existing RESTRICTIVE policies on projects
DROP POLICY IF EXISTS "Anyone can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
