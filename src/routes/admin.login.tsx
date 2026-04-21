import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

const credSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(128),
});

function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [loading, user, isAdmin, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Champs invalides");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error || !data.user) {
      setSubmitting(false);
      toast.error("Identifiants incorrects");
      return;
    }
    // Verify admin role BEFORE navigating to avoid the redirect loop
    const { data: roleRow, error: roleErr } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setSubmitting(false);
    if (roleErr) {
      toast.error("Erreur de vérification du rôle");
      await supabase.auth.signOut();
      return;
    }
    if (!roleRow) {
      toast.error("Compte non administrateur");
      await supabase.auth.signOut();
      return;
    }
    toast.success("Connexion réussie");
    navigate({ to: "/admin" });
  }

  return (
    <div className="relative min-h-screen bg-abyss text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-violet bg-white/[0.03] p-8 backdrop-blur">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/15 text-violet">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">Espace admin</h1>
            <p className="text-xs text-white/55">Réservé à l'administrateur</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/40 border-white/15 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/40 border-white/15 text-white"
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-violet hover:bg-violet/90">
            {submitting ? "Connexion…" : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}