
-- 1. Normalize existing display_order values (sequential based on created_at)
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 AS new_order
  FROM projects
)
UPDATE projects SET display_order = ordered.new_order
FROM ordered WHERE projects.id = ordered.id;

-- 2. Create atomic reorder_project function
CREATE OR REPLACE FUNCTION public.reorder_project(p_project_id UUID, p_new_order INT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old_order INT;
BEGIN
  -- Get current order
  SELECT display_order INTO v_old_order
  FROM projects WHERE id = p_project_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Project not found';
  END IF;

  -- Nothing to do
  IF v_old_order = p_new_order THEN
    RETURN;
  END IF;

  -- Temporarily move project out of the way
  UPDATE projects SET display_order = -9999 WHERE id = p_project_id;

  IF p_new_order < v_old_order THEN
    -- Moving up: shift items in [new, old-1] down by 1
    UPDATE projects
    SET display_order = display_order + 1
    WHERE display_order >= p_new_order
      AND display_order < v_old_order
      AND id != p_project_id;
  ELSE
    -- Moving down: shift items in [old+1, new] up by 1
    UPDATE projects
    SET display_order = display_order - 1
    WHERE display_order > v_old_order
      AND display_order <= p_new_order
      AND id != p_project_id;
  END IF;

  -- Place project at new position
  UPDATE projects SET display_order = p_new_order WHERE id = p_project_id;
END;
$$;
