import { FolderKanban, Tags, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const AdminSidebar = ({ activeView = "projects", onNavigate }: AdminSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <span className="text-lg font-display font-bold gradient-text">Kenkya</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin</span>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "projects"}
                  onClick={() => onNavigate?.("projects")}
                  className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                >
                  <FolderKanban className="h-4 w-4" />
                  <span>Projetos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "categories"}
                  onClick={() => onNavigate?.("categories")}
                  className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                >
                  <Tags className="h-4 w-4" />
                  <span>Categorias</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        <Button
          variant="ghost" size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
