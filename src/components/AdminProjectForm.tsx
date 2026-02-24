import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ImageUpload from "@/components/ImageUpload";
import {
  useAdminProject, useCreateProject, useUpdateProject,
} from "@/hooks/useAdminProjects";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  slug: z.string().min(1, "Slug obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  tags: z.string().min(1, "Tags obrigatórias"),
  image: z.string().url("URL inválida"),
  showcase_image: z.string().optional(),
  live_url: z.string().optional(),
  challenge: z.string().min(1, "Obrigatório"),
  process: z.string().min(1, "Obrigatório"),
  solution: z.string().min(1, "Obrigatório"),
  result: z.string().min(1, "Obrigatório"),
  published: z.boolean(),
  display_order: z.number(),
});

type FormData = z.infer<typeof schema>;

interface AdminProjectFormProps {
  projectId?: string;
  onBack: () => void;
}

interface SectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Section = ({ title, defaultOpen = true, children }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
        {title}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-1 pt-4 pb-2 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const AdminProjectForm = ({ projectId, onBack }: AdminProjectFormProps) => {
  const { data: existing, isLoading } = useAdminProject(projectId);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "", slug: "", description: "", tags: "", image: "",
      showcase_image: "", live_url: "", challenge: "", process: "",
      solution: "", result: "", published: false, display_order: 0,
    },
  });

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title,
        slug: existing.slug,
        description: existing.description,
        tags: existing.tags.join(", "),
        image: existing.image,
        showcase_image: existing.showcase_image ?? "",
        live_url: existing.live_url ?? "",
        challenge: existing.challenge,
        process: existing.process,
        solution: existing.solution,
        result: existing.result,
        published: existing.published,
        display_order: existing.display_order,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (data: FormData) => {
    const tagsArray = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: data.title, slug: data.slug, description: data.description,
      tags: tagsArray, image: data.image,
      showcase_image: data.showcase_image || null,
      live_url: data.live_url || null,
      challenge: data.challenge, process: data.process,
      solution: data.solution, result: data.result,
      published: data.published, display_order: data.display_order,
    };

    try {
      if (projectId) {
        await updateProject.mutateAsync({ id: projectId, ...payload });
        toast.success("Projeto atualizado!");
      } else {
        await createProject.mutateAsync(payload);
        toast.success("Projeto criado!");
      }
      onBack();
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar");
    }
  };

  if (isLoading && projectId) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const published = watch("published");
  const isSaving = createProject.isPending || updateProject.isPending;

  return (
    <div className="pb-24">
      <h2 className="text-xl font-display font-bold text-foreground mb-6">
        {projectId ? "Editar Projeto" : "Novo Projeto"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        {/* Informações básicas */}
        <Section title="Informações básicas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Título</Label>
              <Input {...register("title")} />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label>Slug</Label>
              <Input {...register("slug")} />
              {errors.slug && <p className="text-xs text-destructive mt-1">{errors.slug.message}</p>}
            </div>
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea {...register("description")} />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Tags (separadas por vírgula)</Label>
              <Input {...register("tags")} placeholder="E-commerce, Branding" />
            </div>
            <div>
              <Label>Ordem de exibição</Label>
              <Input type="number" {...register("display_order", { valueAsNumber: true })} />
            </div>
          </div>
        </Section>

        {/* Mídia */}
        <Section title="Mídia">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <ImageUpload
                label="Imagem principal"
                value={watch("image")}
                onUpload={(url) => setValue("image", url, { shouldValidate: true })}
              />
              {errors.image && <p className="text-xs text-destructive mt-1">{errors.image.message}</p>}
            </div>
            <div>
              <ImageUpload
                label="Imagem showcase (opcional)"
                value={watch("showcase_image")}
                onUpload={(url) => setValue("showcase_image", url)}
              />
            </div>
          </div>
          <div>
            <Label>URL ao vivo (opcional)</Label>
            <Input {...register("live_url")} />
          </div>
        </Section>

        {/* Conteúdo do Case */}
        <Section title="Conteúdo do case">
          <div>
            <Label>O Desafio</Label>
            <Textarea {...register("challenge")} rows={3} />
            {errors.challenge && <p className="text-xs text-destructive mt-1">{errors.challenge.message}</p>}
          </div>
          <div>
            <Label>O Processo</Label>
            <Textarea {...register("process")} rows={3} />
          </div>
          <div>
            <Label>A Solução</Label>
            <Textarea {...register("solution")} rows={3} />
          </div>
          <div>
            <Label>O Resultado</Label>
            <Textarea {...register("result")} rows={3} />
          </div>
        </Section>

        {/* Configurações */}
        <Section title="Configurações" defaultOpen={false}>
          <div className="flex items-center gap-3">
            <Switch
              checked={published}
              onCheckedChange={(v) => setValue("published", v)}
            />
            <Label>Publicado</Label>
          </div>
        </Section>

        {/* Sticky footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border p-4 z-50">
          <div className="max-w-2xl mx-auto flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onBack}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
