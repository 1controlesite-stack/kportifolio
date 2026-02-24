import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus, MoreHorizontal, Search, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useAdminProjects, useDeleteProject, useTogglePublished,
} from "@/hooks/useAdminProjects";
import { useCategories } from "@/hooks/useAdminCategories";
import { toast } from "sonner";
import AdminDashboardStats from "@/components/AdminDashboardStats";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 10;

interface AdminProjectListProps {
  onEdit: (id: string) => void;
  onNew: () => void;
}

type StatusFilter = "all" | "published" | "draft";

// Fetch project categories for all projects
function useAllProjectCategories() {
  return useQuery({
    queryKey: ["all-project-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_categories")
        .select("project_id, category_id, categories(name)");
      if (error) throw error;
      const map = new Map<string, { id: string; name: string }[]>();
      (data || []).forEach((pc: any) => {
        const arr = map.get(pc.project_id) || [];
        arr.push({ id: pc.category_id, name: pc.categories?.name || "" });
        map.set(pc.project_id, arr);
      });
      return map;
    },
  });
}

const AdminProjectList = ({ onEdit, onNew }: AdminProjectListProps) => {
  const { data: projects, isLoading } = useAdminProjects();
  const { data: categories = [] } = useCategories();
  const { data: projectCategoriesMap } = useAllProjectCategories();
  const deleteProject = useDeleteProject();
  const togglePublished = useTogglePublished();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [catOpen, setCatOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!projects) return [];
    let result = projects;

    if (statusFilter === "published") result = result.filter((p) => p.published);
    if (statusFilter === "draft") result = result.filter((p) => !p.published);

    if (categoryFilter !== "all") {
      result = result.filter((p) => {
        const cats = projectCategoriesMap?.get(p.id) || [];
        return cats.some((c) => c.id === categoryFilter);
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    return result;
  }, [projects, statusFilter, categoryFilter, search, projectCategoriesMap]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const handleStatusChange = (v: StatusFilter) => { setStatusFilter(v); setCurrentPage(1); };
  const handleCategoryChange = (v: string) => { setCategoryFilter(v); setCurrentPage(1); };
  const handleSearchChange = (v: string) => { setSearch(v); setCurrentPage(1); };

  const published = projects?.filter((p) => p.published).length ?? 0;
  const total = projects?.length ?? 0;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AdminDashboardStats total={total} published={published} drafts={total - published} />

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {([
            { value: "all", label: "Todos" },
            { value: "published", label: "Publicados" },
            { value: "draft", label: "Rascunhos" },
          ] as const).map((opt) => (
            <Button key={opt.value} variant={statusFilter === opt.value ? "default" : "outline"}
              size="sm" className="h-8 text-xs" onClick={() => handleStatusChange(opt.value)}>
              {opt.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar projetos..." value={search}
                onChange={(e) => handleSearchChange(e.target.value)} className="pl-9" />
            </div>
            {categories.length > 0 && (
              <Popover open={catOpen} onOpenChange={setCatOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={catOpen} className="w-48 justify-between h-10">
                    {categoryFilter === "all"
                      ? "Todas as categorias"
                      : categories.find((c) => c.id === categoryFilter)?.name ?? "Categoria"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0">
                  <Command>
                    <CommandInput placeholder="Buscar categoria..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma categoria encontrada</CommandEmpty>
                      <CommandGroup>
                        <CommandItem value="all" onSelect={() => { handleCategoryChange("all"); setCatOpen(false); }}>
                          <Check className={cn("mr-2 h-4 w-4", categoryFilter === "all" ? "opacity-100" : "opacity-0")} />
                          Todas as categorias
                        </CommandItem>
                        {categories.map((cat) => (
                          <CommandItem key={cat.id} value={cat.name} onSelect={() => { handleCategoryChange(cat.id); setCatOpen(false); }}>
                            <Check className={cn("mr-2 h-4 w-4", categoryFilter === cat.id ? "opacity-100" : "opacity-0")} />
                            {cat.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <Button onClick={onNew} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Novo Projeto
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium mb-1">
            {search || statusFilter !== "all" || categoryFilter !== "all" ? "Nenhum resultado" : "Nenhum projeto ainda"}
          </p>
          <p className="text-sm text-muted-foreground">
            {search || statusFilter !== "all" || categoryFilter !== "all"
              ? "Tente outros filtros."
              : 'Crie seu primeiro projeto clicando em "Novo Projeto".'}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12" />
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Categorias</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((project) => {
                  const cats = projectCategoriesMap?.get(project.id) || [];
                  return (
                    <TableRow key={project.id} className="group cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => onEdit(project.id)}>
                      <TableCell className="p-2">
                        <div className="h-9 w-9 rounded-md bg-muted overflow-hidden">
                          {project.image && <img src={project.image} alt="" className="h-full w-full object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {cats.map((c) => (
                            <Badge key={c.id} variant="secondary" className="text-[10px] px-1.5 py-0">{c.name}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={project.published ? "default" : "outline"}
                          className={project.published ? "bg-accent/15 text-accent border-accent/30 hover:bg-accent/20" : "text-muted-foreground"}>
                          {project.published ? "Publicado" : "Rascunho"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => onEdit(project.id)}>
                              <Pencil className="h-4 w-4 mr-2" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              togglePublished.mutate(
                                { id: project.id, published: !project.published },
                                { onSuccess: () => toast.success(!project.published ? "Publicado!" : "Despublicado!") }
                              );
                            }}>
                              {project.published ? "Despublicar" : "Publicar"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(project.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length} projetos
            </p>
            {totalPages > 1 && (
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={page === currentPage} onClick={() => setCurrentPage(page)} className="cursor-pointer">
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (deleteId) {
                deleteProject.mutate(deleteId, {
                  onSuccess: () => { toast.success("Projeto excluído!"); setDeleteId(null); },
                });
              }
            }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminProjectList;
