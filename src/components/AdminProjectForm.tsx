import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  useAdminProject,
  useCreateProject,
  useUpdateProject,
} from "@/hooks/useAdminProjects";
import { toast } from "sonner";

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

const AdminProjectForm = ({ projectId, onBack }: AdminProjectFormProps) => {
  const { data: existing, isLoading } = useAdminProject(projectId);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      tags: "",
      image: "",
      showcase_image: "",
      live_url: "",
      challenge: "",
      process: "",
      solution: "",
      result: "",
      published: false,
      display_order: 0,
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
      title: data.title,
      slug: data.slug,
      description: data.description,
      tags: tagsArray,
      image: data.image,
      showcase_image: data.showcase_image || null,
      live_url: data.live_url || null,
      challenge: data.challenge,
      process: data.process,
      solution: data.solution,
      result: data.result,
      published: data.published,
      display_order: data.display_order,
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

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
      </Button>

      <h2 className="text-xl font-display font-bold text-foreground mb-6">
        {projectId ? "Editar Projeto" : "Novo Projeto"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>URL da imagem</Label>
            <Input {...register("image")} />
            {errors.image && <p className="text-xs text-destructive mt-1">{errors.image.message}</p>}
          </div>
          <div>
            <Label>Imagem showcase (opcional)</Label>
            <Input {...register("showcase_image")} />
          </div>
        </div>

        <div>
          <Label>URL ao vivo (opcional)</Label>
          <Input {...register("live_url")} />
        </div>

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

        <div className="flex items-center gap-3">
          <Switch
            checked={published}
            onCheckedChange={(v) => setValue("published", v)}
          />
          <Label>Publicado</Label>
        </div>

        <Button
          type="submit"
          disabled={createProject.isPending || updateProject.isPending}
        >
          {createProject.isPending || updateProject.isPending
            ? "Salvando..."
            : "Salvar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminProjectForm;
