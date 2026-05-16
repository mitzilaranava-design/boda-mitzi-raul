import { createClient } from "@supabase/supabase-js";

// Normalizar URL: quitar trailing slash y sufijos de API (/rest/v1, etc.)
const backupUrl     = (import.meta.env.VITE_SUPABASE_BACKUP_URL ?? "")
  .replace(/\/rest\/v1.*$/, "")
  .replace(/\/$/, "");
const backupAnonKey =  import.meta.env.VITE_SUPABASE_BACKUP_ANON_KEY ?? "";

// Si hay credenciales de un segundo proyecto Supabase, se usa ese.
// Si no, queda null y gallery.js cae en el cliente principal con bucket privado.
export const supabaseBackup =
  backupUrl && backupAnonKey
    ? createClient(backupUrl, backupAnonKey)
    : null;
