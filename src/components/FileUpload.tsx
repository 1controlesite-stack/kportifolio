import { useState, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  label?: string;
  accept?: string;
  type?: "image" | "audio";
  maxSizeMB?: number;
}

const FileUpload = ({ value, onUpload, label, accept, type = "image", maxSizeMB = 10 }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const defaultAccept = type === "audio" ? "audio/*" : "image/*";
  const finalAccept = accept || defaultAccept;

  const upload = useCallback(async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Arquivo deve ter no máximo ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(name, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast.error("Erro no upload: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(name);

    onUpload(urlData.publicUrl);
    setUploading(false);
    toast.success(type === "audio" ? "Áudio enviado!" : "Imagem enviada!");
  }, [onUpload, type, maxSizeMB]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }, [upload]);

  const Icon = type === "audio" ? Music : ImageIcon;

  return (
    <div className="space-y-2">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-input bg-background">
          {type === "image" ? (
            <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          ) : (
            <div className="p-4">
              <audio controls src={value} className="w-full" />
            </div>
          )}
          <button
            type="button"
            onClick={() => onUpload("")}
            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center gap-2 h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors",
            dragOver ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"
          )}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Arraste ou clique para enviar
              </span>
            </>
          )}
          <input
            type="file"
            accept={finalAccept}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;
