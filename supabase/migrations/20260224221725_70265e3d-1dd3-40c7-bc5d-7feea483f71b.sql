-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

-- Recreate all policies
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images'
  AND public.has_role(auth.uid(), 'admin')
);