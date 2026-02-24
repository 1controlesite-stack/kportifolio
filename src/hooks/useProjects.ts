import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Project = Tables<"projects"> & {
  categories: { id: string; name: string; slug: string }[];
};

export function useProjects() {
  return useQuery({
    queryKey: ["projects", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_categories(category_id, categories(id, name, slug))")
        .eq("published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;

      return (data || []).map((p: any) => ({
        ...p,
        categories: (p.project_categories || []).map((pc: any) => pc.categories).filter(Boolean),
      })) as Project[];
    },
  });
}

export function useProject(slug: string | undefined) {
  return useQuery({
    queryKey: ["project", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_categories(category_id, categories(id, name, slug))")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        categories: (data.project_categories || []).map((pc: any) => pc.categories).filter(Boolean),
      } as Project;
    },
  });
}
