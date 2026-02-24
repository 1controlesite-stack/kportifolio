import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory,
} from "@/hooks/useAdminCategories";
import { toast } from "sonner";

const AdminCategoryList = () => {
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editOrder, setEditOrder] = useState(0);

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const startEdit = (cat: { id: string; name: string; slug: string; display_order: number }) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditOrder(cat.display_order);
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim()) return;
    try {
      await updateCategory.mutateAsync({ id: editingId, name: editName, slug: editSlug, display_order: editOrder });
      toast.success("Categoria atualizada!");
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const saveNew = async () => {
    if (!newName.trim()) return;
    const slug = newSlug.trim() || generateSlug(newName);
    try {
      await createCategory.mutateAsync({ name: newName, slug, display_order: categories.length });
      toast.success("Categoria criada!");
      setAdding(false);
      setNewName("");
      setNewSlug("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-foreground">Categorias</h2>
        <Button size="sm" onClick={() => setAdding(true)} disabled={adding}>
          <Plus className="w-4 h-4 mr-1" /> Nova Categoria
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-24">Ordem</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {adding && (
              <TableRow>
                <TableCell>
                  <Input
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      if (!newSlug) setNewSlug(generateSlug(e.target.value));
                    }}
                    placeholder="Nome"
                    className="h-8"
                    autoFocus
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="slug"
                    className="h-8"
                  />
                </TableCell>
                <TableCell />
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveNew} disabled={createCategory.isPending}>
                      <Check className="w-4 h-4 text-accent" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setAdding(false); setNewName(""); setNewSlug(""); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                  {editingId === cat.id ? (
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8" />
                  ) : (
                    <span className="font-medium">{cat.name}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cat.id ? (
                    <Input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="h-8" />
                  ) : (
                    <span className="text-muted-foreground text-sm">{cat.slug}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cat.id ? (
                    <Input type="number" value={editOrder} onChange={(e) => setEditOrder(Number(e.target.value))} className="h-8 w-16" />
                  ) : (
                    <span className="text-sm text-muted-foreground">{cat.display_order}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cat.id ? (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveEdit} disabled={updateCategory.isPending}>
                        <Check className="w-4 h-4 text-accent" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingId(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(cat)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setDeleteId(cat.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && !adding && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  Nenhuma categoria criada ainda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>Projetos associados perderão esta categoria.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  deleteCategory.mutate(deleteId, {
                    onSuccess: () => { toast.success("Categoria excluída!"); setDeleteId(null); },
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

export default AdminCategoryList;
