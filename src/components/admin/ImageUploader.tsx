import { useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";

type Props = {
  label?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  rounded?: boolean;
};

export function ImageUploader({
  label = "Image",
  value,
  onChange,
  folder = "uploads",
  rounded = false,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Fichier image requis");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop lourde (max 5 Mo)");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("brand-assets")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("brand-assets").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Image uploadée");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur d'upload";
      toast.error(msg);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-white/70 text-xs">{label}</Label>
      <div className="flex items-center gap-3">
        {value ? (
          <div
            className={`relative h-14 w-14 overflow-hidden border border-white/15 bg-black/40 ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
          >
            <img src={value} alt="aperçu" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div
            className={`flex h-14 w-14 items-center justify-center border border-dashed border-white/15 bg-black/40 text-white/30 ${
              rounded ? "rounded-full" : "rounded-md"
            }`}
          >
            <Upload className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {value ? "Remplacer" : "Uploader"}
            </Button>
            {value && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange(null)}
                className="border-red-500/40 text-red-400 hover:bg-red-500/10"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || null)}
            placeholder="ou collez une URL https://…"
            className="bg-black/40 border-white/15 text-white text-xs h-8"
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </div>
  );
}