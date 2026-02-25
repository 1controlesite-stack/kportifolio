import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Project = Tables<"projects">;

export function useAdminProjects() {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });
}

export function useAdminProject(id: string | undefined) {
  return useQuery({
    queryKey: ["admin-project", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as Project;
    },
  });
}

export function useProjectCategories(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-categories", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_categories")
        .select("category_id")
        .eq("project_id", projectId!);
      if (error) throw error;
      return data.map((r) => r.category_id);
    },
  });
}

export function useSaveProjectCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, categoryIds }: { projectId: string; categoryIds: string[] }) => {
      // Delete existing
      await supabase.from("project_categories").delete().eq("project_id", projectId);
      // Insert new
      if (categoryIds.length > 0) {
        const { error } = await supabase
          .from("project_categories")
          .insert(categoryIds.map((category_id) => ({ project_id: projectId, category_id })));
        if (error) throw error;
      }
    },
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["project-categories", projectId] });
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: TablesInsert<"projects">) => {
      // If display_order not specified (auto), put at end
      let finalProject = { ...project };
      if (finalProject.display_order === undefined || finalProject.display_order === -1) {
        const { data: maxRow } = await supabase
          .from("projects")
          .select("display_order")
          .order("display_order", { ascending: false })
          .limit(1)
          .single();
        finalProject.display_order = (maxRow?.display_order ?? -1) + 1;
      }
      const { data, error } = await supabase
        .from("projects")
        .insert(finalProject)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });
}

export function useRepositionProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      projectId,
      newOrder,
      oldOrder,
    }: {
      projectId: string;
      newOrder: number;
      oldOrder?: number;
    }) => {
      // Set temp order to avoid conflicts during shifting
      if (oldOrder !== undefined && oldOrder !== newOrder) {
        await supabase
          .from("projects")
          .update({ display_order: -9999 })
          .eq("id", projectId);
      }

      // Increment everything >= newOrder to make room
      const { data: toShift } = await supabase
        .from("projects")
        .select("id, display_order")
        .gte("display_order", newOrder)
        .neq("id", projectId)
        .order("display_order", { ascending: false });

      if (toShift && toShift.length > 0) {
        for (const row of toShift) {
          await supabase
            .from("projects")
            .update({ display_order: row.display_order + 1 })
            .eq("id", row.id);
        }
      }

      // Set the project to its new position
      const { error } = await supabase
        .from("projects")
        .update({ display_order: newOrder })
        .eq("id", projectId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: TablesUpdate<"projects"> & { id: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useTogglePublished() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from("projects")
        .update({ published })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
