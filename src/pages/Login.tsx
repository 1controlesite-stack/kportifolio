import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        toast.error("Credenciais inválidas");
        return;
      }

      const userId = data.user?.id;
      if (!userId) {
        toast.error("Login realizado, mas a sessão é inválida.");
        return;
      }

      const { data: hasAdminRole, error: roleError } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });

      if (roleError) {
        toast.error("Login realizado, mas não foi possível validar sua permissão.");
        return;
      }

      if (!hasAdminRole) {
        toast.error("Conta autenticada, mas sem permissão de admin.");
        await supabase.auth.signOut();
        return;
      }

      toast.success("Login realizado!");
      navigate("/admin");
    } catch (error) {
      console.error("Erro inesperado no login:", error);
      toast.error("Erro inesperado ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-8 rounded-xl bg-card border border-border"
      >
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-6">
          Admin Login
        </h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
};

export default Login;

