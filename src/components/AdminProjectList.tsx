import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus, MoreHorizontal, Search } from "lucide-react";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useAdminProjects, useDeleteProject, useTogglePublished,
} from "@/hooks/useAdminProjects";
import { toast } from "sonner";
import AdminDashboardStats from "@/components/AdminDashboardStats";

const ITEMS_PER_PAGE = 10;

interface AdminProjectListProps {
  onEdit: (id: string) => void;
  onNew: () => void;
}

type StatusFilter = "all" | "published" | "draft";

const AdminProjectList = ({ onEdit, onNew }: AdminProjectListProps) => {
  const { data: projects, isLoading } = useAdminProjects();
  const deleteProject = useDeleteProject();
  const togglePublished = useTogglePublished();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique tags
  const allTags = useMemo(() => {
    if (!projects) return [];
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    let result = projects;

    // Status filter
    if (statusFilter === "published") result = result.filter((p) => p.published);
    if (statusFilter === "draft") result = result.filter((p) => !p.published);

    // Tag filter
    if (tagFilter !== "all") result = result.filter((p) => p.tags.includes(tagFilter));

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    return result;
  }, [projects, statusFilter, tagFilter, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  // Reset page when filters change
  const handleStatusChange = (v: StatusFilter) => { setStatusFilter(v); setCurrentPage(1); };
  const handleTagChange = (v: string) => { setTagFilter(v); setCurrentPage(1); };
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

      {/* Filters row */}
      <div className="flex flex-col gap-3 mb-4">
        {/* Status chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {([
            { value: "all", label: "Todos" },
            { value: "published", label: "Publicados" },
            { value: "draft", label: "Rascunhos" },
          ] as const).map((opt) => (
            <Button
              key={opt.value}
              variant={statusFilter === opt.value ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => handleStatusChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar projetos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            {allTags.length > 0 && (
              <Select value={tagFilter} onValueChange={handleTagChange}>
                <SelectTrigger className="w-40 h-10">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            {search || statusFilter !== "all" || tagFilter !== "all" ? "Nenhum resultado" : "Nenhum projeto ainda"}
          </p>
          <p className="text-sm text-muted-foreground">
            {search || statusFilter !== "all" || tagFilter !== "all"
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
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((project) => (
                  <TableRow
                    key={project.id}
                    className="group cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => onEdit(project.id)}
                  >
                    <TableCell className="p-2">
                      <div className="h-9 w-9 rounded-md bg-muted overflow-hidden">
                        {project.image ? (
                          <img src={project.image} alt="" className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">+{project.tags.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={project.published ? "default" : "outline"}
                        className={project.published
                          ? "bg-accent/15 text-accent border-accent/30 hover:bg-accent/20"
                          : "text-muted-foreground"}
                      >
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
                          <DropdownMenuItem
                            onClick={() => {
                              togglePublished.mutate(
                                { id: project.id, published: !project.published },
                                { onSuccess: () => toast.success(!project.published ? "Publicado!" : "Despublicado!") }
                              );
                            }}
                          >
                            {project.published ? "Despublicar" : "Publicar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteId(project.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer: counter + pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de {filtered.length} projetos
            </p>
            {totalPages > 1 && (
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
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
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  deleteProject.mutate(deleteId, {
                    onSuccess: () => { toast.success("Projeto excluído!"); setDeleteId(null); },
                  });
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminProjectList;
