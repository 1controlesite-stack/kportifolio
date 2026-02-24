import { FolderKanban, Globe, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminDashboardStatsProps {
  total: number;
  published: number;
  drafts: number;
}

const stats = [
  { key: "total", label: "Total", icon: FolderKanban, color: "text-primary" },
  { key: "published", label: "Publicados", icon: Globe, color: "text-accent" },
  { key: "drafts", label: "Rascunhos", icon: FileText, color: "text-muted-foreground" },
] as const;

const AdminDashboardStats = ({ total, published, drafts }: AdminDashboardStatsProps) => {
  const values = { total, published, drafts };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="bg-card border-border">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {values[key]}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboardStats;
