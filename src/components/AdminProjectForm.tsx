import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FileUpload from "@/components/FileUpload";
import {
  useAdminProject, useCreateProject, useUpdateProject,
} from "@/hooks/useAdminProjects";
import { useCategories } from "@/hooks/useAdminCategories";
import { useProjectCategories, useSaveProjectCategories } from "@/hooks/useAdminProjects";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  slug: z.string().min(1, "Slug obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  image: z.string().url("URL inválida"),
  showcase_image: z.string().optional(),
  live_url: z.string().optional(),
  testimonial_text: z.string().optional(),
  testimonial_image: z.string().optional(),
  testimonial_audio: z.string().optional(),
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
  const { data: allCategories = [] } = useCategories();
  const { data: projectCategoryIds = [] } = useProjectCategories(projectId);
  const saveProjectCategories = useSaveProjectCategories();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "", slug: "", description: "", image: "",
      showcase_image: "", live_url: "",
      testimonial_text: "", testimonial_image: "", testimonial_audio: "",
      published: false, display_order: 0,
    },
  });

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title,
        slug: existing.slug,
        description: existing.description,
        image: existing.image,
        showcase_image: existing.showcase_image ?? "",
        live_url: existing.live_url ?? "",
        testimonial_text: existing.testimonial_text ?? "",
        testimonial_image: existing.testimonial_image ?? "",
        testimonial_audio: existing.testimonial_audio ?? "",
        published: existing.published,
        display_order: existing.display_order,
      });
    }
  }, [existing, reset]);

  useEffect(() => {
    if (projectCategoryIds.length > 0) {
      setSelectedCategoryIds(projectCategoryIds);
    }
  }, [projectCategoryIds]);

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) {
        toast.error("Máximo de 3 categorias por projeto");
        return prev;
      }
      return [...prev, id];
    });
  };

  const onSubmit = async (data: FormData) => {
    const payload = {
      title: data.title, slug: data.slug, description: data.description,
      image: data.image,
      showcase_image: data.showcase_image || null,
      live_url: data.live_url || null,
      testimonial_text: data.testimonial_text || null,
      testimonial_image: data.testimonial_image || null,
      testimonial_audio: data.testimonial_audio || null,
      published: data.published, display_order: data.display_order,
    };

    try {
      let id = projectId;
      if (projectId) {
        await updateProject.mutateAsync({ id: projectId, ...payload });
      } else {
        const created = await createProject.mutateAsync(payload);
        id = created.id;
      }
      if (id) {
        await saveProjectCategories.mutateAsync({ projectId: id, categoryIds: selectedCategoryIds });
      }
      toast.success(projectId ? "Projeto atualizado!" : "Projeto criado!");
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
        </Section>

        <Section title="Mídia">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileUpload
              label="Imagem principal (portfólio)"
              value={watch("image")}
              onUpload={(url) => setValue("image", url, { shouldValidate: true })}
            />
            <FileUpload
              label="Imagem showcase (página do projeto)"
              value={watch("showcase_image")}
              onUpload={(url) => setValue("showcase_image", url)}
            />
          </div>
          {errors.image && <p className="text-xs text-destructive mt-1">{errors.image.message}</p>}
        </Section>

        <Section title="Categorias">
          <p className="text-xs text-muted-foreground mb-2">Selecione até 3 categorias</p>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => {
              const selected = selectedCategoryIds.includes(cat.id);
              return (
                <Badge
                  key={cat.id}
                  variant={selected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selected && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => toggleCategory(cat.id)}
                >
                  {cat.name}
                  {selected && <X className="w-3 h-3 ml-1" />}
                </Badge>
              );
            })}
            {allCategories.length === 0 && (
              <p className="text-sm text-muted-foreground">Crie categorias primeiro no menu "Categorias".</p>
            )}
          </div>
        </Section>

        <Section title="URL">
          <div>
            <Label>URL ao vivo (opcional)</Label>
            <Input {...register("live_url")} placeholder="https://..." />
          </div>
        </Section>

        <Section title="Depoimento do cliente" defaultOpen={false}>
          <div>
            <Label>Texto do depoimento</Label>
            <Textarea {...register("testimonial_text")} rows={3} placeholder="O que o cliente disse..." />
          </div>
          <FileUpload
            label="Imagem do depoimento"
            value={watch("testimonial_image")}
            onUpload={(url) => setValue("testimonial_image", url)}
          />
          <FileUpload
            label="Áudio do depoimento (OGG/MP3)"
            value={watch("testimonial_audio")}
            onUpload={(url) => setValue("testimonial_audio", url)}
            type="audio"
            accept="audio/ogg,audio/mpeg,audio/mp3,audio/*"
          />
        </Section>

        <Section title="Configurações" defaultOpen={false}>
          <div className="flex items-center gap-3">
            <Switch checked={published} onCheckedChange={(v) => setValue("published", v)} />
            <Label>Publicado</Label>
          </div>
          <div>
            <Label>Ordem de exibição</Label>
            <Input type="number" {...register("display_order", { valueAsNumber: true })} />
            <p className="text-xs text-muted-foreground mt-1">Números menores aparecem primeiro. Reordene na lista de projetos.</p>
          </div>
        </Section>

        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border p-4 z-50">
          <div className="max-w-2xl mx-auto flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onBack}>Cancelar</Button>
            <Button type="submit" disabled={isSaving}>{isSaving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
