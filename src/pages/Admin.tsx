import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AdminProjectList from "@/components/AdminProjectList";
import AdminProjectForm from "@/components/AdminProjectForm";

type View = { type: "list" } | { type: "form"; id?: string };

const Admin = () => {
  const { signOut } = useAuth();
  const [view, setView] = useState<View>({ type: "list" });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-display font-bold text-foreground">
            Painel Admin
          </h1>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {view.type === "list" ? (
          <AdminProjectList
            onEdit={(id) => setView({ type: "form", id })}
            onNew={() => setView({ type: "form" })}
          />
        ) : (
          <AdminProjectForm
            projectId={view.id}
            onBack={() => setView({ type: "list" })}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
