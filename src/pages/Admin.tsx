import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import AdminProjectList from "@/components/AdminProjectList";
import AdminProjectForm from "@/components/AdminProjectForm";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type View = { type: "list" } | { type: "form"; id?: string };

const Admin = () => {
  const [view, setView] = useState<View>({ type: "list" });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-3 px-4 h-14">
              <SidebarTrigger className="text-muted-foreground" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="cursor-pointer"
                      onClick={() => setView({ type: "list" })}
                    >
                      Projetos
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {view.type === "form" && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {view.id ? "Editar" : "Novo"}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
