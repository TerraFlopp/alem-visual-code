import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, LogOut, Save } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const Route = createFileRoute("/admin/")({
  component: AdminPanel,
});

type VideoRow = {
  id: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok";
  embed_url: string;
  category: "serious" | "creative";
  display_order: number;
};

type TrustRow = {
  id: string;
  name: string;
  kind: "logo" | "creator";
  initials: string | null;
  display_order: number;
  entity_type: "agence" | "client" | "entreprise" | null;
  followers: number | null;
  logo_url: string | null;
};

type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar_url: string | null;
  display_order: number;
};

const videoSchema = z.object({
  title: z.string().trim().min(1).max(200),
  platform: z.enum(["YouTube", "Instagram", "TikTok"]),
  embed_url: z.string().trim().url().max(500),
  category: z.enum(["serious", "creative"]),
  display_order: z.number().int().min(0).max(9999),
});

const trustSchema = z.object({
  name: z.string().trim().min(1).max(100),
  kind: z.enum(["logo", "creator"]),
  initials: z.string().trim().max(4).optional().nullable(),
  display_order: z.number().int().min(0).max(9999),
  entity_type: z.enum(["agence", "client", "entreprise"]).nullable(),
  followers: z.number().int().min(0).max(1_000_000_000).nullable(),
  logo_url: z.string().trim().url().max(500).nullable(),
});

const testiSchema = z.object({
  quote: z.string().trim().min(1).max(1000),
  name: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(100),
  initials: z.string().trim().min(1).max(4),
  avatar_url: z.string().trim().url().max(500).optional().or(z.literal("")),
  display_order: z.number().int().min(0).max(9999),
});

function AdminPanel() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate({ to: "/admin/login" });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-abyss flex items-center justify-center text-white/60">
        Chargement…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-abyss/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-semibold">Panel admin</h1>
            <p className="text-xs text-white/50">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-white/70 hover:text-white">Voir le site</Link>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/admin/login" });
              }}
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Tabs defaultValue="videos">
          <TabsList className="bg-white/[0.04] border border-violet">
            <TabsTrigger value="videos" className="data-[state=active]:bg-violet">Vidéos</TabsTrigger>
            <TabsTrigger value="trust" className="data-[state=active]:bg-violet">Carousel</TabsTrigger>
            <TabsTrigger value="testi" className="data-[state=active]:bg-violet">Retours clients</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <VideosManager />
          </TabsContent>
          <TabsContent value="trust" className="mt-6">
            <TrustManager />
          </TabsContent>
          <TabsContent value="testi" className="mt-6">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
      {children}
    </div>
  );
}

/* -------------------- VIDEOS -------------------- */
function VideosManager() {
  const qc = useQueryClient();
  const { data = [], refetch } = useQuery({
    queryKey: ["admin-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("category")
        .order("display_order");
      if (error) throw error;
      return data as VideoRow[];
    },
  });

  async function save(row: VideoRow) {
    const parsed = videoSchema.safeParse({
      title: row.title,
      platform: row.platform,
      embed_url: row.embed_url,
      category: row.category,
      display_order: row.display_order,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Champs invalides");
      return;
    }
    const { error } = await supabase.from("videos").update(parsed.data).eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Vidéo enregistrée");
      qc.invalidateQueries({ queryKey: ["videos"] });
      refetch();
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette vidéo ?")) return;
    const { error } = await supabase.from("videos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Supprimée");
      qc.invalidateQueries({ queryKey: ["videos"] });
      refetch();
    }
  }

  async function add() {
    const { error } = await supabase.from("videos").insert({
      title: "Nouvelle vidéo",
      platform: "YouTube",
      embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "serious",
      display_order: data.length,
    });
    if (error) toast.error(error.message);
    else {
      qc.invalidateQueries({ queryKey: ["videos"] });
      refetch();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/60">{data.length} vidéo(s)</p>
        <Button onClick={add} className="bg-violet hover:bg-violet/90">
          <Plus className="h-4 w-4 mr-2" /> Ajouter
        </Button>
      </div>
      <div className="grid gap-4">
        {data.map((row) => (
          <VideoEditor key={row.id} row={row} onSave={save} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}

function VideoEditor({
  row,
  onSave,
  onDelete,
}: {
  row: VideoRow;
  onSave: (r: VideoRow) => void;
  onDelete: (id: string) => void;
}) {
  const [local, setLocal] = useState(row);
  useEffect(() => setLocal(row), [row]);
  return (
    <Card>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label className="text-white/70 text-xs">Titre</Label>
          <Input
            value={local.title}
            onChange={(e) => setLocal({ ...local, title: e.target.value })}
            className="bg-black/40 border-white/15 text-white"
          />
        </div>
        <div>
          <Label className="text-white/70 text-xs">URL embed</Label>
          <Input
            value={local.embed_url}
            onChange={(e) => setLocal({ ...local, embed_url: e.target.value })}
            className="bg-black/40 border-white/15 text-white"
          />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Plateforme</Label>
          <Select
            value={local.platform}
            onValueChange={(v) => setLocal({ ...local, platform: v as VideoRow["platform"] })}
          >
            <SelectTrigger className="bg-black/40 border-white/15 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white/70 text-xs">Catégorie</Label>
          <Select
            value={local.category}
            onValueChange={(v) => setLocal({ ...local, category: v as VideoRow["category"] })}
          >
            <SelectTrigger className="bg-black/40 border-white/15 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serious">Serious & Business</SelectItem>
              <SelectItem value="creative">Divertissement & Créa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white/70 text-xs">Ordre</Label>
          <Input
            type="number"
            value={local.display_order}
            onChange={(e) => setLocal({ ...local, display_order: Number(e.target.value) })}
            className="bg-black/40 border-white/15 text-white"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" size="sm" onClick={() => onDelete(row.id)}
          className="border-red-500/40 text-red-400 hover:bg-red-500/10">
          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
        </Button>
        <Button size="sm" onClick={() => onSave(local)} className="bg-violet hover:bg-violet/90">
          <Save className="h-4 w-4 mr-1" /> Enregistrer
        </Button>
      </div>
    </Card>
  );
}

/* -------------------- TRUST -------------------- */
function TrustManager() {
  const qc = useQueryClient();
  const { data = [], refetch } = useQuery({
    queryKey: ["admin-trust"],
    queryFn: async () => {
      const { data, error } = await supabase.from("trust_items").select("*").order("display_order");
      if (error) throw error;
      return data as TrustRow[];
    },
  });

  async function save(row: TrustRow) {
    const parsed = trustSchema.safeParse({
      name: row.name,
      kind: row.kind,
      initials: row.initials || null,
      display_order: row.display_order,
      entity_type: row.entity_type,
      followers: row.followers,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Champs invalides");
      return;
    }
    const { error } = await supabase.from("trust_items").update(parsed.data).eq("id", row.id);
    if (error) toast.error(error.message);
    else { toast.success("Enregistré"); qc.invalidateQueries({ queryKey: ["trust"] }); refetch(); }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    const { error } = await supabase.from("trust_items").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Supprimé"); qc.invalidateQueries({ queryKey: ["trust"] }); refetch(); }
  }

  async function add() {
    const { error } = await supabase.from("trust_items").insert({
      name: "Nouveau",
      kind: "logo",
      display_order: data.length,
    });
    if (error) toast.error(error.message);
    else { qc.invalidateQueries({ queryKey: ["trust"] }); refetch(); }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/60">{data.length} élément(s)</p>
        <Button onClick={add} className="bg-violet hover:bg-violet/90">
          <Plus className="h-4 w-4 mr-2" /> Ajouter
        </Button>
      </div>
      <div className="grid gap-4">
        {data.map((row) => (
          <TrustEditor key={row.id} row={row} onSave={save} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}

function TrustEditor({
  row, onSave, onDelete,
}: {
  row: TrustRow;
  onSave: (r: TrustRow) => void;
  onDelete: (id: string) => void;
}) {
  const [local, setLocal] = useState(row);
  useEffect(() => setLocal(row), [row]);
  return (
    <Card>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Label className="text-white/70 text-xs">Nom</Label>
          <Input value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Affichage</Label>
          <Select value={local.kind}
            onValueChange={(v) => setLocal({ ...local, kind: v as TrustRow["kind"] })}>
            <SelectTrigger className="bg-black/40 border-white/15 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="creator">Créateur (PP)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white/70 text-xs">Initiales (créateur)</Label>
          <Input value={local.initials ?? ""} maxLength={4}
            onChange={(e) => setLocal({ ...local, initials: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Catégorie</Label>
          <Select
            value={local.entity_type ?? "none"}
            onValueChange={(v) =>
              setLocal({
                ...local,
                entity_type: v === "none" ? null : (v as NonNullable<TrustRow["entity_type"]>),
              })
            }
          >
            <SelectTrigger className="bg-black/40 border-white/15 text-white"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">— Aucune —</SelectItem>
              <SelectItem value="agence">Agence</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="entreprise">Entreprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white/70 text-xs">Abonnés</Label>
          <Input
            type="number"
            min={0}
            placeholder="ex: 125000"
            value={local.followers ?? ""}
            onChange={(e) =>
              setLocal({
                ...local,
                followers: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="bg-black/40 border-white/15 text-white"
          />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Ordre</Label>
          <Input type="number" value={local.display_order}
            onChange={(e) => setLocal({ ...local, display_order: Number(e.target.value) })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" size="sm" onClick={() => onDelete(row.id)}
          className="border-red-500/40 text-red-400 hover:bg-red-500/10">
          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
        </Button>
        <Button size="sm" onClick={() => onSave(local)} className="bg-violet hover:bg-violet/90">
          <Save className="h-4 w-4 mr-1" /> Enregistrer
        </Button>
      </div>
    </Card>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
function TestimonialsManager() {
  const qc = useQueryClient();
  const { data = [], refetch } = useQuery({
    queryKey: ["admin-testi"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
      if (error) throw error;
      return data as TestimonialRow[];
    },
  });

  async function save(row: TestimonialRow) {
    const parsed = testiSchema.safeParse({
      quote: row.quote,
      name: row.name,
      role: row.role,
      company: row.company,
      initials: row.initials,
      avatar_url: row.avatar_url ?? "",
      display_order: row.display_order,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Champs invalides");
      return;
    }
    const payload = { ...parsed.data, avatar_url: parsed.data.avatar_url || null };
    const { error } = await supabase.from("testimonials").update(payload).eq("id", row.id);
    if (error) toast.error(error.message);
    else { toast.success("Enregistré"); qc.invalidateQueries({ queryKey: ["testimonials"] }); refetch(); }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce témoignage ?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Supprimé"); qc.invalidateQueries({ queryKey: ["testimonials"] }); refetch(); }
  }

  async function add() {
    const { error } = await supabase.from("testimonials").insert({
      quote: "Nouveau témoignage…",
      name: "Nom Prénom",
      role: "Rôle",
      company: "Entreprise",
      initials: "NP",
      display_order: data.length,
    });
    if (error) toast.error(error.message);
    else { qc.invalidateQueries({ queryKey: ["testimonials"] }); refetch(); }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/60">{data.length} témoignage(s)</p>
        <Button onClick={add} className="bg-violet hover:bg-violet/90">
          <Plus className="h-4 w-4 mr-2" /> Ajouter
        </Button>
      </div>
      <div className="grid gap-4">
        {data.map((row) => (
          <TestiEditor key={row.id} row={row} onSave={save} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}

function TestiEditor({
  row, onSave, onDelete,
}: {
  row: TestimonialRow;
  onSave: (r: TestimonialRow) => void;
  onDelete: (id: string) => void;
}) {
  const [local, setLocal] = useState(row);
  useEffect(() => setLocal(row), [row]);
  return (
    <Card>
      <div>
        <Label className="text-white/70 text-xs">Citation</Label>
        <Textarea value={local.quote} rows={3}
          onChange={(e) => setLocal({ ...local, quote: e.target.value })}
          className="bg-black/40 border-white/15 text-white" />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Label className="text-white/70 text-xs">Nom</Label>
          <Input value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Rôle</Label>
          <Input value={local.role} onChange={(e) => setLocal({ ...local, role: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Entreprise</Label>
          <Input value={local.company} onChange={(e) => setLocal({ ...local, company: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Initiales</Label>
          <Input value={local.initials} maxLength={4}
            onChange={(e) => setLocal({ ...local, initials: e.target.value })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div className="md:col-span-2">
          <Label className="text-white/70 text-xs">URL photo (optionnel)</Label>
          <Input value={local.avatar_url ?? ""}
            onChange={(e) => setLocal({ ...local, avatar_url: e.target.value })}
            placeholder="https://…"
            className="bg-black/40 border-white/15 text-white" />
        </div>
        <div>
          <Label className="text-white/70 text-xs">Ordre</Label>
          <Input type="number" value={local.display_order}
            onChange={(e) => setLocal({ ...local, display_order: Number(e.target.value) })}
            className="bg-black/40 border-white/15 text-white" />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" size="sm" onClick={() => onDelete(row.id)}
          className="border-red-500/40 text-red-400 hover:bg-red-500/10">
          <Trash2 className="h-4 w-4 mr-1" /> Supprimer
        </Button>
        <Button size="sm" onClick={() => onSave(local)} className="bg-violet hover:bg-violet/90">
          <Save className="h-4 w-4 mr-1" /> Enregistrer
        </Button>
      </div>
    </Card>
  );
}